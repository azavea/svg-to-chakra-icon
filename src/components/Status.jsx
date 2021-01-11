import { Flex, Text, Icon } from "@chakra-ui/react";
import { useShowtime } from "react-showtime";

import { IconUpload, IconDropAdd, IconError, IconDropNew } from "./Icons";

import { pulseAnimation } from "../constants";

const sx = {
    status: {
        direction: "column",
        align: "center",
        border: "8px dashed",
        borderRadius: "0.8rem",
        p: 6,
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
    },
};

function Status({
    isDragging,
    isProcessing,
    canReplace,
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
            if (canReplace) {
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
            borderColor={shouldPulse ? "transparent" : "#E1EAEF"}
            animation={shouldPulse ? pulseAnimation : null}
            color={error ? "red.900" : isDragging ? "teal.800" : "teal.600"}
            {...props}
        >
            <Icon
                as={
                    error
                        ? IconError
                        : isDragging && shouldAppend
                        ? IconDropAdd
                        : isDragging
                        ? IconDropNew
                        : IconUpload
                }
                {...sx.icon}
                opacity={isProcessing ? 0 : isDragging ? 1 : 0.8}
            />
            <Text {...sx.message}>{composeMessage()}</Text>
            {canReplace && isDragging && (
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
