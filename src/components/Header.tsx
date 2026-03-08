import React from "react";
import { Box, Typography } from "@mui/material";

function Header() {
    return (
        <Box
            sx={{
                height: "25vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#1f6fe0",
                color: "white",
                fontWeight: "bold",
                fontSize: 36,
            }}
        >
            <Typography variant="h3">Encryption System</Typography>
        </Box>
    );
}

export default Header;