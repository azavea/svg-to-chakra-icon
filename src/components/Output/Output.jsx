import { Flex } from "@chakra-ui/react";

const sx = {
    output: {
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
    },
};

function Output({ files }) {
    return <Flex sx={sx.output}>Donezo</Flex>;
}

export default Output;
