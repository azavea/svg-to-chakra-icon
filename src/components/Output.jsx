import { useState, useEffect } from "react";
import { Flex, Heading, Button, IconButton, Icon } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { FaCopy } from "react-icons/fa";

import OutputItem from "./OutputItem";
import Settings from "./Settings";
import useLocalStorage from "../utils/useLocalStorage";
import useClipboard from "../utils/useClipboard";
import {
    getImportString,
    composeAggregateCreateIconCode,
} from "../utils/chakra";

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
    settings: {
        mt: 4,
    },
};

function Output({ files, onReset, ...props }) {
    const [settings, setSettings] = useLocalStorage("settings", {
        includeImport: true,
        commas: true,
        semicolons: true,
    });

    const handleSettingsChange = update =>
        setSettings(current => ({ ...current, ...update }));

    const code = composeAggregateCreateIconCode(files, settings);
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
                highlight={settings.includeImport && shouldHighlight}
                pulse={shouldPulse}
                mb={0.5}
                disabled={!settings.includeImport}
                onToggle={value =>
                    handleSettingsChange({ includeImport: value })
                }
                settings={settings}
            >
                {getImportString(settings.semicolons)}
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
            <Settings
                {...sx.settings}
                settings={settings}
                onChange={handleSettingsChange}
            />
        </Flex>
    );
}

export default Output;
