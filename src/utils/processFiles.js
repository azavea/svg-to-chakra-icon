import { pascalCase } from "change-case";
import { parse } from "svgson";

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
    const svg = await readFile(file);
    const optimized = await optimize(svg);
    const json = await parse(optimized);
    return {
        name,
        svg,
        optimized,
        json,
    };
};

export const processFiles = async files => Promise.all(files.map(processFile));
