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
        fontWeight: 400,
    },
    desc: {
        mb: 8,
        fontSize: "xl",
        fontWeight: 700,
    },
};

function Start({ children, ...props }) {
    return (
        <Flex {...sx.start} {...props}>
            <Box {...sx.header} as="header">
                <Heading as="h1" {...sx.heading}>
                    &lt;svg&gt; &rArr; Chakra UI
                </Heading>
                <Text {...sx.desc}>
                    Optimize &amp; convert SVG files to Chakra Icon components
                </Text>
            </Box>
            {children}
        </Flex>
    );
}

export default Start;
