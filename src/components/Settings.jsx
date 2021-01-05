import { Flex, Switch, FormLabel, Text, useToken } from "@chakra-ui/react";

const sx = {
    settings: {
        direction: "row",
        wrap: "wrap",
        justify: "center",
        align: "center",
    },
    setting: {
        direction: "row",
        justify: "center",
        align: "center",
        mx: 2,
        mb: 2,
    },
    switch: {
        sx: {
            ".js-focus-visible & :focus+[data-focus]": {
                boxShadow: "none",
            },
            ".js-focus-visible & .focus-visible+[data-focus]": {
                boxShadow: "0 0 0 3px var(--highlight)",
            },
        },
    },
    label: {
        display: "flex",
        direction: "row",
        align: "center",
        my: 0,
        pl: 1.5,
        whiteSpace: "nowrap",
        cursor: "pointer",
    },
    code: {
        fontFamily: "mono",
    },
};

function SettingToggle({
    name,
    isChecked,
    label,
    onChange,
    fade,
    ariaLabel,
    ...props
}) {
    const [highlight] = useToken("colors", ["highlight"]);

    return (
        <Flex
            {...sx.setting}
            opacity={fade ? 0.5 : 1}
            {...props}
            sx={{ "--highlight": highlight }}
        >
            <Switch
                {...sx.switch}
                colorScheme="teal"
                id={name}
                isChecked={isChecked}
                onChange={({ target }) => onChange({ [name]: target.checked })}
                aria-label={ariaLabel}
            />
            <FormLabel {...sx.label} htmlFor={name}>
                {label}
            </FormLabel>
        </Flex>
    );
}

function Settings({ settings, onChange, ...props }) {
    const {
        includeImport,
        includeExport,
        commas,
        semicolons,
        format,
    } = settings;

    return (
        <Flex {...sx.settings} {...props}>
            <SettingToggle
                name="includeImport"
                isChecked={includeImport}
                onChange={onChange}
                label={
                    <Text as="code" {...sx.code}>
                        import
                    </Text>
                }
                ariaLabel="Include import statment"
            />
            <SettingToggle
                name="includeExport"
                isChecked={includeExport}
                onChange={onChange}
                label={
                    <Text as="code" {...sx.code}>
                        export
                    </Text>
                }
                ariaLabel="Prepend export to each icon definition"
            />
            <SettingToggle
                name="semicolons"
                isChecked={semicolons}
                onChange={onChange}
                label="semicolons"
                ariaLabel="Print semicolons at the ends of statements"
            />
            <SettingToggle
                name="commas"
                isChecked={commas}
                onChange={onChange}
                label="trailing commas"
                ariaLabel="Print trailing comma for multi-line lists"
                fade={format === "component"}
            />
        </Flex>
    );
}

export default Settings;
