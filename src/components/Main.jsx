import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

import Start from "./Start";
import Output from "./Output";
import { processFiles } from "../utils/processFiles";

function Main() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [files, setFiles] = useState([]);
    const isDone = files?.length > 0;

    // TODO React Dropzone docs wrap this in useCallback with [] dep array. Necessary?
    const onDrop = async (acceptedFiles, fileRejections) => {
        if (fileRejections?.length) return;

        setIsProcessing(true);
        try {
            const files = await processFiles(acceptedFiles);
            const unique = [
                ...new Map(files.map(file => [file.name, file])).values(),
            ];
            const sorted = unique.sort((a, b) => (a.name > b.name ? 1 : -1));
            setFiles(sorted);
        } catch (e) {
            console.error(e);
        }
        setIsProcessing(false);
    };

    const {
        draggedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: "image/svg+xml",
        onDrop,
    });

    const getBg = () => {
        if (isDragReject) return "red.300";
        if (isDragActive) return "green.300";
        if (isDragAccept || isDone) return "#38B2AC";
        return "yellow.300";
    };

    return (
        <Box
            bg={getBg()}
            {...getRootProps()}
            transition="background-color 150ms"
        >
            {isDone ? (
                <Output files={files} onReset={() => setFiles([])} />
            ) : (
                <>
                    <Start
                        isDragging={isDragActive}
                        numIcons={draggedFiles.length}
                        isProcessing={isProcessing}
                        error={isDragReject ? "SVG only please" : null}
                    />
                    <input {...getInputProps()} />
                </>
            )}
        </Box>
    );
}

export default Main;
