import { useState, useEffect } from "react";
import { Flex, Box, Center, IconButton, Icon } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";

import useClipboard from "../utils/useClipboard";
import { generateCreateIconCode } from "../utils/chakra";
import { pulseAnimation } from "../constants";

const sx = {
    outputItem: {
        position: "relative",
        alignItems: "stretch",
        bg: "white",
    },
    outputItemHighlight: {
        bg: "red.100",
    },
    preview: {
        flex: "none",
        width: "20rem",
        bg: "#FFFFFFAA",
    },
    icon: {
        width: "8rem",
        height: "8rem",
        opacity: 0.3,
    },
    iconHighlight: {
        color: "red.700",
    },
    code: {
        flex: "auto",
        px: 5,
        py: 2,
        overflowX: "auto",
        bg: "#EDF2F7AA",
        font: "mono",
    },
    copy: {
        position: "absolute",
        top: 0,
        right: 0,
        p: 2,
        height: "auto",
        fontSize: "2.4rem",
        bg: "transparent",
        color: "blue.700",
        opacity: 0.5,
        ":hover": {
            bg: "transparent",
            opacity: 1,
        },
        ":focus": {
            boxShadow: "none",
        },
    },
    copyHighlight: {
        color: "red.700",
        opacity: 1,
    },
};

function OutputItem({ file = {}, highlight, pulse, ...props }) {
    const { name, json, optimized } = file;
    const code = json
        ? generateCreateIconCode(name, json)
        : 'import { createIcon } from "@chakra-ui/icons";';
    const { onCopy, hasCopied } = useClipboard(code);

    const [shouldHighlight, setShouldHighlight] = useState(false);
    const [shouldPulse, setShouldPulse] = useState(false);

    const doHighlight = highlight || shouldHighlight;
    const doPulse = pulse || shouldPulse;

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
        <Flex
            sx={{
                ...sx.outputItem,
                ...(doHighlight ? sx.outputItemHighlight : {}),
            }}
            {...props}
        >
            <Center sx={sx.preview}>
                {optimized && (
                    <Box
                        dangerouslySetInnerHTML={{ __html: optimized }}
                        sx={{
                            ...sx.icon,
                            ...(doHighlight ? sx.iconHighlight : {}),
                        }}
                        title={name}
                        animation={doPulse ? pulseAnimation : null}
                    />
                )}
            </Center>
            <Box sx={sx.code}>
                <pre>{code}</pre>
            </Box>
            <IconButton
                sx={{
                    ...sx.copy,
                    ...(doHighlight ? sx.copyHighlight : {}),
                }}
                icon={<Icon as={FaCopy} />}
                size="lg"
                aria-label="Copy source code"
                onClick={handleClick}
                onMouseEnter={handleFocus}
                onFocus={handleFocus}
                onMouseLeave={handleBlur}
                onBlur={handleBlur}
            />
        </Flex>
    );
}

export default OutputItem;
