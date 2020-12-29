import { Grid, Link, Image } from "@chakra-ui/react";

import logo from "../img/azavea-white.svg";

const sx = {
    footer: {
        placeItems: "center",
        py: "4rem",
        opacity: 0.6,
    },
};

function Footer(props) {
    return (
        <Grid {...sx.footer} {...props}>
            <Link href="https://www.azavea.com/" title="Made by Azavea">
                <Image src={logo} alt="" htmlWidth="60" />
            </Link>
        </Grid>
    );
}

export default Footer;
