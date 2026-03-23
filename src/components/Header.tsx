import { Box, Typography } from "@mui/material";

function Header() {

    return (
        <Box
            sx={{
                width: "100%",
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
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>Encryption System</Typography>
        </Box>
    );
}

export default Header;