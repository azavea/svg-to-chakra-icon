import { useState, useEffect } from "react";
import { Flex, Button, IconButton, Icon } from "@chakra-ui/react";
import { IconCopy } from "./Icons";

import Logo from "./Logo";
import FormatPicker from "./FormatPicker";
import OutputItem from "./OutputItem";
import Settings from "./Settings";
import useLocalStorage from "../utils/useLocalStorage";
import useClipboard from "../utils/useClipboard";
import { getImportString, composeAggregateIconCode } from "../utils/chakra";

const sx = {
    output: {
        direction: "column",
        width: "100vw",
        px: { base: 2, md: 4 },
        pt: 3,
        pb: 4,
    },
    header: {
        justify: "space-between",
        align: "center",
        mb: 4,
    },
    home: {
        display: { base: "none", md: "inline-flex" },
        p: 1,
        width: "24rem",
        minWidth: "18rem",
        bg: "none",
        opacity: 0.2,
        _focus: { opacity: 1 },
        _hover: {
            bg: "transparent",
            opacity: 1,
        },
        _active: {
            bg: "none",
        },
        sx: {
            ".js-focus-visible &:focus": {
                boxShadow: "none",
            },
            ".js-focus-visible &.focus-visible": {
                color: "highlight",
            },
        },
    },
    formatPicker: {},
    copy: {
        flex: "none",
        ml: { base: 0, md: 10 },
        p: { base: 1, sm: 2 },
        height: "auto",
        fontSize: { base: "sm", md: "md" },
        color: "highlightTint",
        bg: "highlight",
        border: "3px solid",
        borderColor: "highlight",
        _hover: {
            color: "white",
            boxShadow: 1,
        },
        _active: {
            color: "highlight",
            bg: "transparent",
            boxShadow: 0,
        },
        sx: {
            ".js-focus-visible &:focus:not(:hover)": {
                boxShadow: 0,
            },
            ".js-focus-visible &:focus:hover": {
                boxShadow: 1,
            },
            ".js-focus-visible &:focus:hover:active": {
                boxShadow: 0,
            },
            ".js-focus-visible &.focus-visible": {
                color: "highlight",
                bg: "highlightTint",
                boxShadow: 1,
            },
            ".js-focus-visible &.focus-visible:active": {
                bg: "highlight",
                color: "highlightTint",
                boxShadow: 0,
            },
        },
    },
    icon: {
        mr: 2,
        fontSize: { base: "md", md: "2xl" },
    },
    settings: {
        mb: 1,
    },
};

function Output({ files, onReset, ...props }) {
    const [settings, setSettings] = useLocalStorage("settings", {
        format: "function",
        includeImport: true,
        commas: true,
        semicolons: true,
    });

    const handleSettingsChange = update =>
        setSettings(current => ({ ...current, ...update }));

    const code = composeAggregateIconCode(files, settings);
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
                <IconButton
                    {...sx.home}
                    onClick={onReset}
                    title="Reset"
                    icon={<Logo height="auto" width="100%" />}
                />
                <FormatPicker
                    format={settings.format}
                    onChange={format => handleSettingsChange({ format })}
                    {...sx.formatPicker}
                />
                <Button
                    {...sx.copy}
                    onClick={handleClick}
                    onMouseEnter={handleFocus}
                    onFocus={handleFocus}
                    onMouseLeave={handleBlur}
                    onBlur={handleBlur}
                    aria-label="Copy Chakra code for all icons"
                >
                    <Icon {...sx.icon} as={IconCopy} /> Copy all
                </Button>
            </Flex>
            <Settings
                {...sx.settings}
                settings={settings}
                onChange={handleSettingsChange}
            />
            <OutputItem
                highlight={settings.includeImport && shouldHighlight}
                pulse={shouldPulse}
                mb={0.5}
                disabled={!settings.includeImport}
                settings={settings}
            >
                {getImportString(settings)}
            </OutputItem>
            {files.map(file => (
                <OutputItem
                    file={file}
                    key={file.name}
                    highlight={shouldHighlight}
                    pulse={shouldPulse}
                    settings={settings}
                    mb={0.5}
                />
            ))}
        </Flex>
    );
}

export default Output;
