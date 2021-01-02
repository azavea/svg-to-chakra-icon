import { useState, useEffect } from "react";
import { Flex, Box, Center, IconButton, Icon } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";

import useClipboard from "../utils/useClipboard";
import { composeIconCode } from "../utils/chakra";
import { pulseAnimation } from "../constants";

const sx = {
    outputItem: {
        position: "relative",
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
        fontSize: "8rem",
        opacity: 0.7,
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
        fontFamily: "mono",
        whiteSpace: "pre",
        transition: "opacity 150ms",
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
        transition: "opacity 150ms",
        _hover: {
            bg: "transparent",
            opacity: 0.8,
        },
        _focus: {
            boxShadow: "none",
            opacity: 0.8,
        },
        _disabled: {
            opacity: 0,
            pointerEvents: "none",
        },
    },
    copyHighlight: {
        color: "red.700",
        opacity: 0,
    },
};

function OutputItem({
    file = {},
    highlight,
    pulse,
    disabled = false,
    settings,
    children,
    ...props
}) {
    const { name, json, optimized } = file;
    const code = json ? composeIconCode(name, json, settings) : children;
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
            {...sx.outputItem}
            {...(doHighlight ? sx.outputItemHighlight : {})}
            {...props}
        >
            <Center {...sx.preview}>
                {optimized && (
                    <Box
                        dangerouslySetInnerHTML={{ __html: optimized }}
                        title={name}
                        {...sx.icon}
                        {...(doHighlight ? sx.iconHighlight : {})}
                        animation={doPulse ? pulseAnimation : null}
                    />
                )}
            </Center>
            <Box {...sx.code} opacity={disabled ? 0.3 : 1}>
                {code}
            </Box>
            <IconButton
                {...sx.copy}
                {...(doHighlight ? sx.copyHighlight : {})}
                icon={<Icon as={FaCopy} />}
                size="lg"
                aria-label="Copy source code"
                disabled={disabled}
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
