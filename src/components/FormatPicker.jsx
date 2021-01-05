import { useState, useEffect, useRef } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

import usePrevious from "../utils/usePrevious";

const sx = {
    picker: {
        position: "relative",
        direction: "row",
        align: "center",
    },
    button: {
        mx: 3,
        px: 0.5,
        py: 3,
        fontSize: "xl",
        bg: "none",
        color: "gray.600",
        fontFamily: "mono",
        textAlign: "center",
        transition: "color 150ms",
        _selected: {
            color: "teal.500",
        },
        _hover: {
            bg: "none",
        },
        _active: {
            bg: "none",
        },
        sx: {
            ".js-focus-visible &:focus": {
                boxShadow: "none",
            },
            ".js-focus-visible &.focus-visible": {
                bg: "highlight",
                color: "teal.50",
            },
        },
    },
    indicator: {
        position: "absolute",
        bottom: 0,
        height: "3px",
        bg: "highlight",
        pointerEvents: "none",
        transition: "all 150ms",
    },
};

function FormatPicker({ format, onChange, ...props }) {
    const previousFormat = usePrevious(format);
    const pickerRef = useRef();
    const [indicatorLayout, setIndicatorLayout] = useState({
        left: "50%",
        width: 0,
    });
    useEffect(() => {
        const selectedEl = pickerRef.current.querySelector(
            `[data-format="${format}"]`
        );
        const { offsetLeft: left, clientWidth: width } = selectedEl;
        const transition = previousFormat ? {} : { transition: "none" };
        setIndicatorLayout({
            left: `${left}px`,
            width: `${width}px`,
            ...transition,
        });
    }, [format, previousFormat]);

    return (
        <Flex
            {...sx.picker}
            {...props}
            role="listbox"
            aria-label="Choose an output format"
            aria-activedescendant={format}
            ref={pickerRef}
        >
            <Button
                {...sx.button}
                id="function"
                onClick={() => onChange("function")}
                aria-selected={format === "function"}
                aria-label="createIcon function"
                role="option"
                data-format="function"
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
                data-format="component"
            >
                &lt;Icon&gt;
            </Button>
            <Box {...sx.indicator} {...indicatorLayout} />
        </Flex>
    );
}

export default FormatPicker;
