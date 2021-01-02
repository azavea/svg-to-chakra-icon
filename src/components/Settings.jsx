import { Flex, Switch, FormLabel, Text } from "@chakra-ui/react";

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
    switch: {},
};

function SettingToggle({ name, isChecked, label, onChange, ...props }) {
    return (
        <Flex {...sx.setting} {...props}>
            <Switch
                {...sx.switch}
                id={name}
                isChecked={isChecked}
                onChange={({ target }) => onChange({ [name]: target.checked })}
            />
            <FormLabel {...sx.label} htmlFor={name}>
                {label}
            </FormLabel>
        </Flex>
    );
}

function Settings({ settings, onChange, ...props }) {
    const { includeImport, includeExport, commas, semicolons } = settings;

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
            />
            <SettingToggle
                name="semicolons"
                isChecked={semicolons}
                onChange={onChange}
                label="Semicolons"
            />
            <SettingToggle
                name="commas"
                isChecked={commas}
                onChange={onChange}
                label="Trailing commas"
            />
        </Flex>
    );
}

export default Settings;
