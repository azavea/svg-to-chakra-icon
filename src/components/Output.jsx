import { useState, useEffect } from "react";
import { Flex, Heading, Button, IconButton, Icon } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { FaCopy } from "react-icons/fa";

import OutputItem from "./OutputItem";
import useClipboard from "../utils/useClipboard";
import { importString, composeAggregateCreateIconCode } from "../utils/chakra";

const sx = {
    output: {
        direction: "column",
        width: "100vw",
        p: 4,
    },
    header: {
        align: "center",
        mb: 2,
    },
    heading: {
        fontSize: "2.8rem",
        fontWeight: 400,
        lineHeight: 1,
    },
    reset: {
        ml: 1.5,
        p: 1,
        height: "auto",
        bg: "none",
        fontSize: "2.4rem",
        opacity: 0.8,
        ":hover": {
            opacity: 1,
        },
    },
    copy: {
        ml: "auto",
        p: 2,
        height: "auto",
        fontSize: "1.6rem",
        opacity: 0.8,
        ":hover": {
            opacity: 1,
        },
    },
    icon: {
        mr: 2,
        fontSize: "2.4rem",
    },
};

function Output({ files, onReset, ...props }) {
    const [includeImport, setIncludeImport] = useState(true);

    const code = composeAggregateCreateIconCode(files, includeImport);
    const { onCopy, hasCopied } = useClipboard(code);

    const [shouldHighlight, setShouldHighlight] = useState(false);
    const [shouldPulse, setShouldPulse] = useState(false);

    useEffect(() => {
        !hasCopied && setShouldPulse(false);
    }, [hasCopied]);

    const handleClick = () => {
        onCopy();
        setShouldPulse(true);
    };

    const handleFocus = () => {
        setShouldPulse(false);
        setShouldHighlight(true);
    };

    const handleBlur = () => {
        setShouldPulse(false);
        setShouldHighlight(false);
    };

    return (
        <Flex {...sx.output} {...props}>
            <Flex {...sx.header}>
                <Heading as="h1" {...sx.heading}>{`${files.length} icon${
                    files.length === 1 ? "" : "s"
                } formatted for Chakra UI`}</Heading>
                <IconButton
                    onClick={onReset}
                    {...sx.reset}
                    isRound
                    icon={<MdClose />}
                />
                <Button
                    {...sx.copy}
                    onClick={handleClick}
                    onMouseEnter={handleFocus}
                    onFocus={handleFocus}
                    onMouseLeave={handleBlur}
                    onBlur={handleBlur}
                    aria-label="Copy source code"
                >
                    <Icon {...sx.icon} as={FaCopy} /> Copy all
                </Button>
            </Flex>
            <OutputItem
                highlight={shouldHighlight}
                pulse={shouldPulse}
                mb={0.5}
                disabled={!includeImport}
                onToggle={setIncludeImport}
            >
                {importString}
            </OutputItem>
            {files.map(file => (
                <OutputItem
                    file={file}
                    key={file.name}
                    highlight={shouldHighlight}
                    pulse={shouldPulse}
                    mb={0.5}
                />
            ))}
        </Flex>
    );
}

export default Output;
