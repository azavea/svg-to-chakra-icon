import { Flex, Text, Icon } from "@chakra-ui/react";
import { useShowtime } from "react-showtime";
import { FiUploadCloud } from "react-icons/fi";
import { GiParachute } from "react-icons/gi";
import { FaRegFrownOpen } from "react-icons/fa";

import { pulseAnimation } from "../constants";

const sx = {
    status: {
        direction: "column",
        align: "center",
    },
    icon: {
        mb: 2,
        fontSize: "6xl",
    },
    message: {
        fontSize: "lg",
        fontWeight: "bold",
        textAlign: "center",
        whiteSpace: "nowrap",
    },
};

function Status({ isDragging, isProcessing, numIcons = 0, error, ...props }) {
    const [ref] = useShowtime({
        transition: "rise",
        duration: 500,
        startWithTransition: true,
    });
    return (
        <Flex
            ref={ref}
            {...sx.status}
            animation={
                error || isDragging || isProcessing ? pulseAnimation : null
            }
            {...props}
        >
            <Icon
                as={
                    error
                        ? FaRegFrownOpen
                        : isDragging || isProcessing
                        ? GiParachute
                        : FiUploadCloud
                }
                {...sx.icon}
                opacity={isDragging ? 0.8 : isProcessing ? 0 : 0.4}
            />
            <Text {...sx.message} opacity={isDragging ? 0.8 : 0.4}>
                {error ||
                    (isDragging
                        ? `Drop ${numIcons === 1 ? "it" : "'em"}!`
                        : isProcessing
                        ? ""
                        : "Drag SVG icons here")}
            </Text>
        </Flex>
    );
}

export default Status;
