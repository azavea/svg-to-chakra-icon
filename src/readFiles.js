import { pascalCase } from "change-case";
import { optimize } from "./optimize";

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
    const svg = await readFile(file);
    const optimized = await optimize(svg);
    return {
        name,
        preview,
        svg,
        optimized,
    };
};

export const readFiles = async files => Promise.all(files.map(processFile));
