import { useState, useLayoutEffect, useCallback, useEffect } from "react";
import { Flex, Grid, useToken } from "@chakra-ui/react";
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
    overlay: {
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

    const [colorStart, colorDrag, colorDone, colorError] = useToken("colors", [
        "start",
        "drag",
        "done",
        "error",
    ]);

    const onDrop = useCallback(
        async (acceptedFiles, fileRejections, { shiftKey }) => {
            if (fileRejections?.length) {
                setError("SVG only please");
                return;
            }

            setIsProcessing(true);
            try {
                const droppedFiles = await processFiles(acceptedFiles);

                const replace = isDone && shiftKey;
                const newFiles = replace
                    ? droppedFiles
                    : [...files, ...droppedFiles];

                const unique = [
                    ...new Map(
                        newFiles.map(file => [file.name, file])
                    ).values(),
                ];
                const sorted = unique.sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setFiles(sorted);
            } catch (e) {
                setError("Something went wrong. See console.");
                console.error(e);
            }
            setIsProcessing(false);
        },
        [files, isDone]
    );

    const {
        draggedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        accept: "image/svg+xml",
        onDrop,
    });

    useLayoutEffect(() => {
        setError(null);
    }, [isDragActive]);

    useEffect(() => {
        error && setTimeout(() => setError(null), 1200);
    }, [error]);

    // Hold shift to replace, not append, when dropping onto existing files
    const [shouldAppend, setShouldAppend] = useState(true);
    useEffect(() => {
        const onKeyDown = ({ key }) =>
            (key === "Shift") & setShouldAppend(false);
        const onKeyUp = ({ key }) => (key === "Shift") & setShouldAppend(true);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        };
    }, []);

    const getStatusColor = (translucent = false) => {
        const color = error
            ? colorError
            : isDragActive
            ? colorDrag
            : isProcessing || isDone
            ? colorDone
            : colorStart;
        const opacity = translucent ? "EE" : "FF";
        return `${color}${opacity}`;
    };

    const status = (
        <Status
            isDragging={isDragActive}
            isProcessing={isProcessing}
            canAppend={isDone}
            shouldAppend={shouldAppend}
            numIcons={draggedFiles.length}
            error={error}
        />
    );

    const showOverlay = isDragActive || isProcessing || error;

    return (
        <Flex
            {...sx.main}
            bg={getStatusColor()}
            transition="background-color 150ms"
            {...getRootProps()}
        >
            {isDone ? (
                <>
                    <Output files={files} onReset={() => setFiles([])} />
                    {showOverlay && (
                        <Grid {...sx.overlay} bg={getStatusColor(true)}>
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
