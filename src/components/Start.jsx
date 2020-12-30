import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const sx = {
    start: {
        direction: "column",
        align: "center",
        width: "100vw",
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
        mb: 8,
        fontSize: "xl",
        fontWeight: "bold",
    },
};

function Start({ children, ...props }) {
    return (
        <Flex {...sx.start} {...props}>
            <Box {...sx.header} as="header">
                <Heading as="h1" {...sx.heading}>
                    SVG to Chakra Icon
                </Heading>
                <Text {...sx.desc}>
                    Optimize and convert SVG icons to Chakra UI JSX
                </Text>
            </Box>
            {children}
        </Flex>
    );
}

export default Start;
