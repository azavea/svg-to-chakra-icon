import { Flex, Switch, FormLabel } from "@chakra-ui/react";

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
    switch: {},
};

function Settings({ settings, onChange, ...props }) {
    const { commas, semicolons } = settings;

    return (
        <Flex {...sx.settings} {...props}>
            <Flex {...sx.setting}>
                <Switch
                    {...sx.switch}
                    id="commas"
                    isChecked={commas}
                    onChange={({ target }) =>
                        onChange({ commas: target.checked })
                    }
                />
                <FormLabel {...sx.label} htmlFor="commas">
                    Trailing commas
                </FormLabel>
            </Flex>
            <Flex {...sx.setting}>
                <Switch
                    {...sx.switch}
                    id="semicolons"
                    isChecked={semicolons}
                    onChange={({ target }) =>
                        onChange({ semicolons: target.checked })
                    }
                />
                <FormLabel {...sx.label} htmlFor="semicolons">
                    Semicolons
                </FormLabel>
            </Flex>
        </Flex>
    );
}

export default Settings;
