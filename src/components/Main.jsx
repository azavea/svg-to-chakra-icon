import { Box } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

import Start from "./Start";
import Output from "./Output";

function Main() {
    const {
        acceptedFiles,
        fileRejections,
        draggedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: "image/svg+xml",
    });

    const isDone = acceptedFiles?.length && !fileRejections?.length; // && svg optimization succeeds

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
                <Output files={acceptedFiles} />
            ) : (
                <>
                    <Start
                        hasErrors={isDragReject}
                        isDragging={isDragActive}
                        numIcons={draggedFiles.length}
                    />
                    <input {...getInputProps()} />
                </>
            )}
        </Box>
    );
}

export default Main;
