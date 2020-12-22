export const generateCreateIconCode = (name, json) => {
    const viewBox = json.attributes.viewBox;
    const d = json.children.find(node => node.name === "path").attributes.d;

    return `export const ${name} = createIcon({
  displayName: "${name}",
  viewBox: "${viewBox}",
  d: "${d}"
});`;
};

export const generateAggregateCreateIconCode = files =>
    files.reduce(
        (acc, { name, json }) =>
            acc + "\n\n" + generateCreateIconCode(name, json),
        'import { createIcon } from "@chakra-ui/icons";'
    );
