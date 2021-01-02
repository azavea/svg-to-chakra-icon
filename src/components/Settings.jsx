import { Flex, Switch, FormLabel, Text } from "@chakra-ui/react";

const sx = {
    settings: {
        direction: "row",
        justify: "center",
        align: "center",
    },
    setting: {
        direction: "row",
        justify: "center",
        align: "center",
        mx: 2,
    },
    label: {
        display: "flex",
        direction: "row",
        align: "center",
        my: 0,
        pl: 1.5,
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
    const { includeExport, commas, semicolons } = settings;

    return (
        <Flex {...sx.settings} {...props}>
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
                name="commas"
                isChecked={commas}
                onChange={onChange}
                label="Trailing commas"
            />
            <SettingToggle
                name="semicolons"
                isChecked={semicolons}
                onChange={onChange}
                label="Semicolons"
            />
        </Flex>
    );
}

export default Settings;
