import { Grid, Link, Image } from "@chakra-ui/react";

import logo from "../img/azavea-color-full.svg";

const sx = {
    footer: {
        placeItems: "center",
        py: "4rem",
    },
    link: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 0.3,
        filter: "saturate(0) brightness(0)",
        _focus: {
            opacity: 1,
            filter: "initial",
        },
        _hover: {
            opacity: 1,
            filter: "initial",
        },
    },
    logo: {
        height: "35px",
    },
};

function Footer(props) {
    return (
        <Grid {...sx.footer} {...props}>
            <Link
                {...sx.link}
                href="https://www.azavea.com/"
                title="Made by Azavea"
                onClick={e => e.stopPropagation()}
            >
                <Image src={logo} alt="" {...sx.logo} />
            </Link>
        </Grid>
    );
}

export default Footer;
