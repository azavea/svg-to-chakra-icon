import {
    Flex,
    Image,
    Box,
    Center,
    IconButton,
    Icon,
    useClipboard,
} from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";

import { generateCreateIconCode } from "../utils/chakra";

const sx = {
    outputItem: {
        position: "relative",
        alignItems: "center",
        bg: "white",
    },
    preview: {
        flex: "none",
        width: "20rem",
    },
    icon: {
        width: "8rem",
        height: "8rem",
        opacity: 0.4,
    },
    code: {
        flex: "auto",
        px: 5,
        py: 2,
        overflowX: "auto",
        bg: "gray.100",
        font: "mono",
    },
    copy: {
        position: "absolute",
        top: 0,
        right: 0,
        p: 2,
        height: "auto",
        fontSize: "2.4rem",
        opacity: 0.5,
        ":hover": {
            opacity: 1,
        },
    },
};

function OutputItem({ file = {}, ...props }) {
    const { name, preview, json } = file;
    const code = json
        ? generateCreateIconCode(name, json)
        : 'import { createIcon } from "@chakra-ui/icons";';
    const { onCopy } = useClipboard(code);

    return (
        <Flex sx={sx.outputItem} {...props}>
            <Center sx={sx.preview}>
                {preview && (
                    <Image sx={sx.icon} src={preview} alt={name} title={name} />
                )}
            </Center>
            <Box sx={sx.code}>
                <pre>{code}</pre>
            </Box>
            <IconButton
                sx={sx.copy}
                onClick={onCopy}
                icon={<Icon as={FaCopy} />}
                size="lg"
                aria-label="Copy source code"
            />
        </Flex>
    );
}

export default OutputItem;
