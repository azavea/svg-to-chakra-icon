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
    removeAttrs,
    removeDimensions,
    removeXMLNS,
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
    collapseGroups, // moved near end bc groups need some cleaning to be eligible for collapsing
    // NON-DEFAULTS...
    { ...removeXMLNS, active: true },
    { ...removeDimensions, active: true },
    {
        ...removeAttrs,
        active: true,
        params: { attrs: "(stroke|fill|class|data.*)" },
    },
];

const svgo = new SVGO({ plugins });

export const optimize = async file => {
    const optimized = await svgo.optimize(file);
    return optimized.data;
};
