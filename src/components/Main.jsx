import { useState, useLayoutEffect } from "react";
import { Flex, Grid } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

import Start from "./Start";
import Status from "./Status";
import Output from "./Output";
import Footer from "./Footer";
import { processFiles } from "../utils/processFiles";

const sx = {
    main: {
        minHeight: "100vh",
        direction: "column",
    },
    status: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        placeItems: "center",
        bg: "#00000044",
        pointerEvents: "none",
    },
    footer: {
        mt: "auto",
    },
};

function Main() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState();
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
            setError("Something went wrong. See console.");
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

    useLayoutEffect(() => {
        setError(isDragReject ? "SVG only please" : null);
    }, [isDragReject, isDragActive, isDragAccept]);

    const getStatusColor = (translucent = false) => {
        const color = error
            ? "#FC8181"
            : isDragActive
            ? "#68D391"
            : isDragAccept || isProcessing || isDone
            ? "#38B2AC"
            : "#F6E05E";
        const opacity = translucent ? "EE" : "FF";
        return `${color}${opacity}`;
    };

    const status = (
        <Status
            isDragging={isDragActive}
            isProcessing={isDragAccept || isProcessing}
            numIcons={draggedFiles.length}
            error={error}
        />
    );

    return (
        <Flex
            {...sx.main}
            bg={getStatusColor()}
            {...getRootProps()}
            transition="background-color 150ms"
        >
            {isDone ? (
                <>
                    <Output files={files} onReset={() => setFiles([])} />
                    {(isDragActive || isDragAccept || isProcessing) && (
                        <Grid {...sx.status} bg={getStatusColor(true)}>
                            {status}
                        </Grid>
                    )}
                </>
            ) : (
                <>
                    <Start>{status}</Start>
                    <input {...getInputProps()} />
                </>
            )}
            <Footer {...sx.footer} />
        </Flex>
    );
}

export default Main;
