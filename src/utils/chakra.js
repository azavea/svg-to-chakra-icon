export const importString = 'import { createIcon } from "@chakra-ui/icons";';

const composePaths = (pathNodes = []) => {
    if (pathNodes.length === 0) {
        return "";
    }

    // Single path
    if (pathNodes.length === 1) {
        return `  d: "${pathNodes[0].attributes.d}",\n`;
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

    return `  path: (\n    <>\n${arr}    </>\n  ),\n`;
};

export const composeCreateIconCode = (name, json) => {
    const viewBox = json.attributes.viewBox;
    const pathNodes = json.children.filter(node => node.name === "path");
    const paths = composePaths(pathNodes);

    return (
        `export const ${name} = createIcon({\n` +
        `  displayName: "${name}",\n` +
        (viewBox ? `  viewBox: "${viewBox}",\n` : "") +
        paths +
        `});`
    );
};

export const composeAggregateCreateIconCode = (files, includeImport) =>
    [
        ...(includeImport ? [importString] : []),
        ...files.map(({ name, json }) => composeCreateIconCode(name, json)),
    ].join("\n\n");
