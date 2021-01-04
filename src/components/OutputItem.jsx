import { useState, useEffect } from "react";
import { Flex, Box, Center, IconButton, Icon } from "@chakra-ui/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark";
import { FaCopy } from "react-icons/fa";

import useClipboard from "../utils/useClipboard";
import { composeIconCode } from "../utils/chakra";
import { pulseAnimation } from "../constants";

const sx = {
    outputItem: {
        position: "relative",
    },
    preview: {
        flex: "none",
        width: "20rem",
    },
    icon: {
        fontSize: "8rem",
        opacity: 0.6,
    },
    iconHighlight: {
        color: "highlight",
        opacity: 0.4,
    },
    code: {
        flex: "auto",
        px: 5,
        py: 2,
        overflowX: "auto",
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
        fontSize: "2xl",
        bg: "transparent",
        color: "white",
        opacity: 0.8,
        transition: "opacity 150ms",
        _hover: {
            opacity: 1,
            bg: "highlightTint",
        },
        _active: {
            bg: "highlight",
            color: "highlightTint",
        },
        _disabled: {
            opacity: 0,
            pointerEvents: "none",
        },
        sx: {
            ".js-focus-visible &:focus": {
                boxShadow: "none",
            },
            ".js-focus-visible &.focus-visible": {
                color: "highlight",
                opacity: 1,
            },
            ".js-focus-visible &.focus-visible:active": {
                bg: "highlight",
                color: "highlightTint",
            },
        },
    },
    copyHighlight: {
        color: "highlight",
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

    // Pulse when copy button clicked
    useEffect(() => {
        setShouldPulse(hasCopied);
    }, [hasCopied]);

    // Pulse on initial load
    useEffect(() => {
        setShouldPulse(true);
        const timeoutId = window.setTimeout(() => {
            setShouldPulse(false);
        }, 300);
        return () => window.clearTimeout(timeoutId);
    }, []);

    const handleClick = () => onCopy();

    const handleFocus = () => {
        setShouldPulse(false);
        setShouldHighlight(true);
    };

    const handleBlur = () => {
        setShouldPulse(false);
        setShouldHighlight(false);
    };

    return (
        <Flex {...sx.outputItem} opacity={disabled ? 0.3 : 1} {...props}>
            <Center {...sx.preview} bg={optimized ? "white" : "transparent"}>
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
            <Highlight
                {...defaultProps}
                theme={vsDark}
                code={code}
                language="jsx"
            >
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <Box
                        {...sx.code}
                        className={className}
                        style={style}
                        aria-label={`Code for ${name}`}
                    >
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </Box>
                )}
            </Highlight>
            <IconButton
                {...sx.copy}
                {...(doHighlight ? sx.copyHighlight : {})}
                icon={<Icon as={FaCopy} />}
                size="lg"
                disabled={disabled}
                onClick={handleClick}
                onMouseEnter={handleFocus}
                onFocus={handleFocus}
                onMouseLeave={handleBlur}
                onBlur={handleBlur}
                aria-label={`Copy code for ${name} to clipboard`}
            />
        </Flex>
    );
}

export default OutputItem;
