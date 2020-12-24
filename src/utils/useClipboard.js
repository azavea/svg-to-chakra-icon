import { useState, useCallback, useEffect } from "react";

/**
 * React hook to copy content to clipboard
 *
 * Adapted from https://github.com/chakra-ui/chakra-ui/blob/develop/packages/hooks/src/use-clipboard.ts
 *
 * @param text the text or value to copy
 * @param timeout delay (in ms) to switch back to initial state once copied.
 */
function useClipboard(text, timeout = 300) {
    const [hasCopied, setHasCopied] = useState(false);

    const onCopy = useCallback(async () => {
        await navigator.clipboard.writeText(text);
        setHasCopied(true);
    }, [text]);

    useEffect(() => {
        let timeoutId;

        if (hasCopied) {
            timeoutId = window.setTimeout(() => {
                setHasCopied(false);
            }, timeout);
        }

        return () => {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [timeout, hasCopied]);

    return { value: text, onCopy, hasCopied };
}

export default useClipboard;
