import { Flex, Text } from "@chakra-ui/react";

import Logo from "./Logo";

const sx = {
    start: {
        direction: "column",
        align: "center",
        width: "100vw",
        py: { base: 0, sm: 10 },
    },
    header: {
        direction: "column",
        align: "center",
        my: { base: 8, md: 16 },
        mx: 4,
        maxWidth: "64rem",
    },
    logo: {
        width: "56rem",
        maxWidth: "90%",
        height: "auto",
        opacity: 0.85,
    },
    desc: {
        my: 8,
        fontSize: { base: "lg", md: "xl" },
        fontWeight: 700,
        textAlign: "center",
    },
};

function Start({ children, ...props }) {
    return (
        <Flex {...sx.start} {...props}>
            <Flex {...sx.header} as="header">
                <Logo {...sx.logo} />
                <Text {...sx.desc}>
                    Optimize &amp; convert SVG files to Chakra Icon components
                </Text>
            </Flex>
            {children}
        </Flex>
    );
}

export default Start;
