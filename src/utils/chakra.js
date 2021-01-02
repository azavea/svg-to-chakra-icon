const importCreateIcon = 'import { createIcon } from "@chakra-ui/react"';
const importIconComponent = 'import { Icon } from "@chakra-ui/react"';

export const getImportString = ({ format, semicolons }) => {
    const importString =
        format === "function"
            ? importCreateIcon
            : format === "component"
            ? importIconComponent
            : "";
    const semicolon = semicolons ? ";" : "";
    return `${importString}${semicolon}`;
};

const composePaths = (pathNodes = []) =>
    pathNodes.reduce((acc, current) => {
        return (
            acc +
            "      <path\n" +
            `        fill="currentColor"\n` +
            `        d="${current.attributes.d}"\n` +
            "      />\n"
        );
    }, "");

const composeCreateIconPaths = (pathNodes = [], commas) => {
    if (pathNodes.length === 0) {
        return "";
    }

    const comma = commas ? "," : "";

    // Single path
    if (pathNodes.length === 1) {
        return `  d: "${pathNodes[0].attributes.d}"${comma}\n`;
    }

    // Multiple paths...
    // Chakra docs say create an array of <path>'s
    // - https://chakra-ui.com/docs/components/icon#using-the-createicon-function
    // but that generates an error about each path requiring a key
    // so instead we wrap them all in a Fragment
    // - https://github.com/chakra-ui/chakra-ui/issues/2007#issuecomment-690327295
    const arr = composePaths(pathNodes);
    return `  path: (\n    <>\n${arr}    </>\n  )${comma}\n`;
};

const composeCreateIconCode = (
    name,
    json,
    { commas, semicolons, includeExport }
) => {
    const viewBox = json.attributes.viewBox;
    const pathNodes = json.children.filter(node => node.name === "path");
    const paths = composeCreateIconPaths(pathNodes, commas);
    const exportStr = includeExport ? "export " : "";
    const semicolon = semicolons ? ";" : "";

    return (
        `${exportStr}const ${name} = createIcon({\n` +
        `  displayName: "${name}",\n` +
        (viewBox ? `  viewBox: "${viewBox}",\n` : "") +
        paths +
        `})${semicolon}`
    );
};

const composeAggregateCreateIconCode = (files, settings) => {
    const { includeImport } = settings;
    return [
        ...(includeImport ? [getImportString(settings)] : []),
        ...files.map(({ name, json }) =>
            composeCreateIconCode(name, json, settings)
        ),
    ].join("\n\n");
};

const composeIconComponentCode = (
    name,
    json,
    { semicolons, includeExport }
) => {
    const viewBox = json.attributes.viewBox;
    const pathNodes = json.children.filter(node => node.name === "path");
    const paths = composePaths(pathNodes);
    const exportStr = includeExport ? "export " : "";
    const semicolon = semicolons ? ";" : "";

    return (
        `${exportStr}const ${name} = (props) => (\n` +
        `  <Icon viewBox="${viewBox}" {...props}>\n` +
        paths +
        "  </Icon>\n" +
        `)${semicolon}`
    );
};

const composeAggregateIconComponentCode = (files, settings) => {
    const { includeImport } = settings;
    return [
        ...(includeImport ? [getImportString(settings)] : []),
        ...files.map(({ name, json }) =>
            composeIconComponentCode(name, json, settings)
        ),
    ].join("\n\n");
};

export const composeIconCode = (name, json, settings) => {
    const { format } = settings;

    if (format === "function") {
        return composeCreateIconCode(name, json, settings);
    }
    if (format === "component") {
        return composeIconComponentCode(name, json, settings);
    }
    return "";
};

export const composeAggregateIconCode = (files, settings) => {
    const { format } = settings;
    if (format === "function") {
        return composeAggregateCreateIconCode(files, settings);
    }
    if (format === "component") {
        return composeAggregateIconComponentCode(files, settings);
    }
    return "";
};
