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
        fontWeight: 600,
        textAlign: "center",
        whiteSpace: "nowrap",
    },
    append: {
        mt: 1,
        fontSize: "xs",
        fontWeight: 600,
        textAlign: "center",
        whiteSpace: "nowrap",
        opacity: 0.6,
    },
};

function Status({
    isDragging,
    isProcessing,
    canAppend,
    shouldAppend,
    numIcons = 0,
    error,
    ...props
}) {
    const [ref] = useShowtime({
        transition: "rise",
        duration: 500,
        startWithTransition: true,
    });

    const composeMessage = () => {
        if (error) return error;
        if (isDragging) {
            if (canAppend) {
                if (shouldAppend) return "Drop to append";
                return "Drop to replace all icons";
            }
            return `Drop ${numIcons === 1 ? "it" : "'em"}!`;
        }
        if (isProcessing) return "";
        return "Drag SVG icons here";
    };

    const shouldPulse = error || isDragging || isProcessing;

    return (
        <Flex
            ref={ref}
            {...sx.status}
            animation={shouldPulse ? pulseAnimation : null}
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
                {composeMessage()}
            </Text>
            {canAppend && isDragging && (
                <Text {...sx.append}>
                    {shouldAppend
                        ? "Hold SHIFT to replace"
                        : "Release SHIFT to append"}
                </Text>
            )}
        </Flex>
    );
}

export default Status;
