import { SVGO } from "libsvgo/module/lib/svgo";
import * as ALL_PLUGINS from "libsvgo/module/plugins/__all";

const {
    // DEFAULTS
    cleanupAttrs,
    cleanupEnableBackground,
    cleanupIDs,
    cleanupNumericValues,
    collapseGroups,
    convertColors,
    convertEllipseToCircle,
    convertPathData,
    convertShapeToPath,
    convertStyleToAttrs,
    convertTransform,
    inlineStyles,
    mergePaths,
    minifyStyles,
    moveElemsAttrsToGroup,
    moveGroupAttrsToElems,
    removeComments,
    removeDesc,
    removeDoctype,
    removeEditorsNSData,
    removeEmptyAttrs,
    removeEmptyContainers,
    removeEmptyText,
    removeHiddenElems,
    removeMetadata,
    removeNonInheritableGroupAttrs,
    removeTitle,
    removeUnknownsAndDefaults,
    removeUnusedNS,
    removeUselessDefs,
    removeUselessStrokeAndFill,
    // removeViewBox,   // a default we don't want
    removeXMLProcInst,
    sortDefsChildren,
    // NON-DEFAULTS
    addAttributesToSVGElement,
    removeAttrs,
    removeDimensions,
    removeRasterImages,
    removeXMLNS,
    sortAttrs,
} = ALL_PLUGINS;

const plugins = [
    // DEFAULTS...
    cleanupAttrs,
    cleanupEnableBackground,
    cleanupIDs,
    cleanupNumericValues,
    convertColors,
    convertEllipseToCircle,
    convertPathData,
    convertShapeToPath,
    convertStyleToAttrs,
    convertTransform,
    inlineStyles,
    mergePaths,
    minifyStyles,
    moveElemsAttrsToGroup,
    moveGroupAttrsToElems,
    removeComments,
    removeDesc,
    removeDoctype,
    removeEditorsNSData,
    removeEmptyAttrs,
    removeEmptyContainers,
    removeEmptyText,
    removeHiddenElems,
    removeMetadata,
    removeNonInheritableGroupAttrs,
    removeTitle,
    removeUnknownsAndDefaults,
    removeUnusedNS,
    removeUselessDefs,
    removeUselessStrokeAndFill,
    // removeViewBox,   // a default we don't want
    removeXMLProcInst,
    sortDefsChildren,
    // NON-DEFAULTS...
    {
        ...removeAttrs,
        active: true,
        params: { attrs: "(stroke|fill|class|data.*)" },
    },
    { ...removeDimensions, active: true },
    { ...removeRasterImages, active: true },
    { ...removeXMLNS, active: true },
    {
        ...addAttributesToSVGElement,
        active: true,
        params: {
            attributes: [
                {
                    focusable: false,
                    "aria-hidden": true,
                    fill: "currentColor",
                    role: "presentation",
                    width: "1em",
                    height: "1em",
                },
            ],
        },
    },
    { ...sortAttrs, active: true },
    // DEFAULT but moved to end bc groups need some cleaning to become eligible for collapse
    collapseGroups,
];

const svgo = new SVGO({ plugins });

export const optimize = async file => {
    const optimized = await svgo.optimize(file);
    return optimized.data;
};
