import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            html: {
                fontSize: "62.5%",
            },
            body: {
                fontSize: "md",
            },
        },
    },
    space: {
        px: "1px",
        0: "0",
        0.5: "0.4rem",
        1: "0.8rem",
        1.5: "1.2rem",
        2: "1.6rem",
        2.5: "2rem",
        3: "2.4rem",
        3.5: "2.8rem",
        4: "3.2rem",
        5: "4rem",
        6: "4.8rem",
        7: "5.6rem",
        8: "6.4rem",
        9: "7.2rem",
        10: "8rem",
        12: "8.8rem",
        14: "9.6rem",
        16: "10.4rem",
    },
    fontSizes: {
        xs: "1.2rem",
        sm: "1.4rem",
        md: "1.6rem",
        lg: "1.8rem",
        xl: "2.0rem",
        "2xl": "2.4rem",
        "3xl": "2.8rem",
        "4xl": "3.6rem",
        "5xl": "4.8rem",
        "6xl": "6.4rem",
    },
});
