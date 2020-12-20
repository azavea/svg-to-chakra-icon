import { pascalCase } from "change-case";

const readFile = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.onabort = () => reject("File reading aborted.");
        reader.readAsText(file);
    });
};

const processFile = async file => {
    const name = pascalCase(file.name.replace(".svg", ""));
    const preview = URL.createObjectURL(file);
    const svgString = await readFile(file);
    // const svgOptimized = await optimizeSvgFile(svgString);
    return {
        name,
        preview,
        svgString,
        // svgOptimized,
    };
};

export const readFiles = async files => Promise.all(files.map(processFile));
