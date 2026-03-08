import React from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import BodySection from "./components/BodySection";
import Executor from "./components/Executor.tsx";

function App() {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Header />
            <BodySection />
            <Executor />
        </Box>
    );
}

export default App;