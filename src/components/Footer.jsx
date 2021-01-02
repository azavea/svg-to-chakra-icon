import { Grid, Link, Image } from "@chakra-ui/react";

import logo from "../img/azavea-black.svg";

const sx = {
    footer: {
        placeItems: "center",
        py: "4rem",
    },
    link: {
        opacity: 0.2,
        _focus: {
            opacity: 0.6,
        },
    },
};

function Footer(props) {
    return (
        <Grid {...sx.footer} {...props}>
            <Link
                {...sx.link}
                href="https://www.azavea.com/"
                title="Made by Azavea"
            >
                <Image src={logo} alt="" htmlWidth="60" />
            </Link>
        </Grid>
    );
}

export default Footer;
