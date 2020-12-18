import { Center, Box, Heading, Text, Icon } from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";

const sx = {
    start: {
        width: "100vw",
        height: "100vh",
    },
    box: {
        maxWidth: "64rem",
        textAlign: "center",
    },
    heading: {
        mb: 4,
        fontSize: "6xl",
    },
    desc: {
        mb: 10,
        fontSize: "xl",
        fontWeight: "bold",
    },
    icon: {
        mb: 0.5,
        fontSize: "6xl",
        color: "gray.200",
    },
    howto: {
        fontSize: "sm",
        fontWeight: "bold",
        color: "gray.400",
    },
};

function Start() {
    return (
        <Center sx={sx.start}>
            <Box sx={sx.box}>
                <Heading as="h1" sx={sx.heading}>
                    SVG to Chakra Icon
                </Heading>
                <Text sx={sx.desc}>
                    Optimize and convert SVG icons to Chakra UI JSX
                </Text>
                <Icon as={FiUploadCloud} sx={sx.icon} />
                <Text sx={sx.howto}>Drag SVG files here to get started</Text>
            </Box>
        </Center>
    );
}

export default Start;
