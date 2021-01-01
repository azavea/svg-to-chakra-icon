const importString = 'import { createIcon } from "@chakra-ui/icons"';

export const getImportString = semicolons =>
    `${importString}${semicolons ? ";" : ""}`;

const composePaths = (pathNodes = [], commas) => {
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
    const arr = pathNodes.reduce((acc, current) => {
        return (
            acc +
            "      <path\n" +
            `        fill="currentColor"\n` +
            `        d="${current.attributes.d}"\n` +
            "      />\n"
        );
    }, "");

    return `  path: (\n    <>\n${arr}    </>\n  )${comma}\n`;
};

export const composeCreateIconCode = (name, json, { commas, semicolons }) => {
    const viewBox = json.attributes.viewBox;
    const pathNodes = json.children.filter(node => node.name === "path");
    const paths = composePaths(pathNodes, commas);

    return (
        `export const ${name} = createIcon({\n` +
        `  displayName: "${name}",\n` +
        (viewBox ? `  viewBox: "${viewBox}",\n` : "") +
        paths +
        `})${semicolons ? ";" : ""}`
    );
};

export const composeAggregateCreateIconCode = (files, includeImport, options) =>
    [
        ...(includeImport ? [getImportString(options.semicolons)] : []),
        ...files.map(({ name, json }) =>
            composeCreateIconCode(name, json, options)
        ),
    ].join("\n\n");
