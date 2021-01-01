import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import Main from "./components/Main";
import { theme } from "./theme";

import "./App.css";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Main />
        </ChakraProvider>
    );
}

export default App;
