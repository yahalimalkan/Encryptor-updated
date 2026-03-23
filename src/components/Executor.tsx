import { Box, Button } from "@mui/material";
import {UseAppStore} from "../store/UseAppStore";


const Executor = () => {

    const { algorithm } = UseAppStore();

    return (
        <Box
            sx={{
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Button
                variant="contained"
                color="primary"
                sx={{
                    px: 6,
                    py: 2,
                    fontSize: 18,
                    borderRadius: 2,
                    "&:hover": {
                        backgroundColor: "#1f6fe0",
                        transform: "scale(1.05)",
                    },
                }}
                onClick={() => {alert(algorithm)}}
            >
                Start process
            </Button>
        </Box>
    );
}

export default Executor;