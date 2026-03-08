import {Paper, Typography} from "@mui/material";

const ActionSelector = () => {
    return (
        <Paper
            sx={{
                height: "100%",
                borderRadius: 4,
            }}
        >
            <Typography variant="h6">Encryption</Typography>
        </Paper>
    );
};

export default ActionSelector;