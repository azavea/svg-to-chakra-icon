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
    return (
        <Flex sx={sx.output}>
            {files.map(({ name, preview }) => (
                <img src={preview} key={name} alt="" width="200" />
            ))}
        </Flex>
    );
}

export default Output;
