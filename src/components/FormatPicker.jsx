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
    },
    on: {
        borderBottomColor: "black",
        _hover: {
            borderBottomColor: "black",
        },
    },
};

function FormatPicker({ format, onChange, ...props }) {
    return (
        <Flex {...sx.picker} {...props}>
            <Button
                {...sx.button}
                {...(format === "function" ? sx.on : {})}
                onClick={() => onChange("function")}
            >
                createIcon()
            </Button>
            <Button
                {...sx.button}
                {...(format === "component" ? sx.on : {})}
                onClick={() => onChange("component")}
            >
                &lt;Icon&gt;
            </Button>
        </Flex>
    );
}

export default FormatPicker;
