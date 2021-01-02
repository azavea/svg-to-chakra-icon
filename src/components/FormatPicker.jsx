import { Flex, Button } from "@chakra-ui/react";

const sx = {
    picker: {
        direction: "row",
        align: "center",
    },
    button: {
        mx: 4,
        px: 0.5,
        py: 3,
        fontSize: "xl",
        borderBottom: "3px solid transparent",
        borderRadius: 0,
        bg: "none",
        fontFamily: "mono",
        _hover: {
            bg: "none",
            borderBottomColor: "#00000066",
        },
        _selected: {
            borderBottomColor: "black",
            _hover: {
                borderBottomColor: "black",
            },
        },
        sx: {
            ".js-focus-visible &:focus": {
                boxShadow: "none",
            },
            ".js-focus-visible &.focus-visible": {
                color: "highlight",
                "&[aria-selected=true]": {
                    borderBottomColor: "highlight",
                },
            },
        },
    },
};

function FormatPicker({ format, onChange, ...props }) {
    return (
        <Flex
            {...sx.picker}
            {...props}
            role="listbox"
            aria-label="Choose an output format"
            aria-activedescendant={format}
        >
            <Button
                {...sx.button}
                id="function"
                onClick={() => onChange("function")}
                aria-selected={format === "function"}
                aria-label="createIcon function"
                role="option"
            >
                createIcon()
            </Button>
            <Button
                {...sx.button}
                id="component"
                onClick={() => onChange("component")}
                aria-selected={format === "component"}
                aria-label="Icon component"
                role="option"
            >
                &lt;Icon&gt;
            </Button>
        </Flex>
    );
}

export default FormatPicker;
