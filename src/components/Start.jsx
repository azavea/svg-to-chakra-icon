import { Flex, Box, Heading, Text, Icon } from "@chakra-ui/react";
import { useShowtime } from "react-showtime";
import { FiUploadCloud } from "react-icons/fi";
import { GiParachute } from "react-icons/gi";
import { FaRegFrownOpen } from "react-icons/fa";

const sx = {
    start: {
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        py: 10,
    },
    header: {
        my: 16,
        maxWidth: "64rem",
        textAlign: "center",
    },
    heading: {
        mb: 4,
        fontSize: "6xl",
    },
    desc: {
        fontSize: "xl",
        fontWeight: "bold",
    },
    status: {
        mt: 16,
        mb: "auto",
        textAlign: "center",
    },
    icon: {
        mb: 2,
        fontSize: "6xl",
    },
    message: {
        fontSize: "lg",
        fontWeight: "bold",
        whiteSpace: "nowrap",
    },
};

function Start({ hasErrors, isDragging, numIcons, ...props }) {
    const [ref] = useShowtime({
        transition: "rise",
        duration: 500,
        startWithTransition: true,
    });
    return (
        <Flex sx={sx.start} {...props}>
            <Box sx={sx.header} as="header">
                <Heading as="h1" sx={sx.heading}>
                    SVG to Chakra Icon
                </Heading>
                <Text sx={sx.desc}>
                    Optimize and convert SVG icons to Chakra UI JSX
                </Text>
            </Box>
            <Box ref={ref} sx={sx.status}>
                <Icon
                    as={
                        hasErrors
                            ? FaRegFrownOpen
                            : isDragging
                            ? GiParachute
                            : FiUploadCloud
                    }
                    sx={sx.icon}
                    opacity={isDragging ? 1 : 0.4}
                />
                <Text sx={sx.message} opacity={isDragging ? 1 : 0.4}>
                    {hasErrors
                        ? "SVG only please"
                        : isDragging
                        ? `Drop ${numIcons === 1 ? "it" : "'em"}!`
                        : "Drag SVG icons here"}
                </Text>
            </Box>
            )
        </Flex>
    );
}

export default Start;
