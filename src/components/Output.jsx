import { useState, useEffect } from "react";
import { Flex, Button, IconButton, Icon } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";

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
        p: 4,
    },
    header: {
        justify: "space-between",
        align: "center",
        mb: 4,
    },
    home: {
        p: 1,
        width: "24rem",
        bg: "none",
        _hover: {
            bg: "transparent",
        },
        _focus: {
            color: "highlight",
        },
    },
    formatPicker: {},
    copy: {
        ml: 10,
        p: 2,
        height: "auto",
        fontSize: "md",
        opacity: 0.8,
        _hover: {
            color: "highlight",
            bg: "highlightTint",
            opacity: 1,
        },
        _focus: {
            color: "highlight",
            bg: "highlightTint",
            boxShadow: "none",
            opacity: 1,
        },
    },
    icon: {
        mr: 2,
        fontSize: "2xl",
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
                    <Icon {...sx.icon} as={FaCopy} /> Copy all
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
