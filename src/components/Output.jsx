import { useState } from "react";
import {
    Flex,
    Heading,
    Button,
    IconButton,
    Icon,
    useClipboard,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { FaCopy } from "react-icons/fa";

import OutputItem from "./OutputItem";
import { generateAggregateCreateIconCode } from "../utils/chakra";

const sx = {
    output: {
        flexDirection: "column",
        width: "100vw",
        minHeight: "100vh",
        p: 4,
    },
    header: {
        alignItems: "center",
        mb: 2,
    },
    heading: {
        fontSize: "2.8rem",
        fontWeight: "normal",
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

function Output({ files, onReset }) {
    const code = generateAggregateCreateIconCode(files);
    const { onCopy } = useClipboard(code);

    const [shouldHighlight, setShouldHighlight] = useState(false);
    const [shouldPulse, setShouldPulse] = useState(false);

    const handleClick = () => {
        onCopy();
        setShouldPulse(true);
        setTimeout(() => setShouldPulse(false), 300);
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
        <Flex sx={sx.output}>
            <Flex sx={sx.header}>
                <Heading as="h1" sx={sx.heading}>{`${files.length} icon${
                    files.length === 1 ? "" : "s"
                } formatted for Chakra UI`}</Heading>
                <IconButton
                    onClick={onReset}
                    sx={sx.reset}
                    isRound
                    icon={<MdClose />}
                />
                <Button
                    sx={sx.copy}
                    onClick={handleClick}
                    onMouseEnter={handleFocus}
                    onFocus={handleFocus}
                    onMouseLeave={handleBlur}
                    onBlur={handleBlur}
                    aria-label="Copy source code"
                >
                    <Icon sx={sx.icon} as={FaCopy} /> Copy all
                </Button>
            </Flex>
            <OutputItem
                highlight={shouldHighlight}
                pulse={shouldPulse}
                mb={0.5}
            />
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
