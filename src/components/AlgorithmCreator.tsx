import {Box, Button, Paper} from "@mui/material";
import {useState} from "react";
import AlgoDialog from "./AlgoDialog";

export interface AlgorithmConfig {
    type: string;
    child?: AlgorithmConfig;
    childA?: AlgorithmConfig;
    childB?: AlgorithmConfig;
}

const AlgorithmCreator: React.FC = () => {

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const [algorithms, setAlgorithms] = useState<string[]>([]);

    const handleSaveAlgorithm = (newAlgo: string[]): void => {
        setAlgorithms(newAlgo);
    };

    return (
        <Paper
            sx={{
                height: "100%",
                borderRadius: 4,
            }}
        >
            <Box sx={{
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                {algorithms.length === 0 ?
                    <Button variant="contained"
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
                            onClick={() => setIsDialogOpen(true)}>
                        יצירת אלגוריתמים
                    </Button>
                    :
                    <Button variant="contained"
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
                    >
                        מחק אלגוריתמים
                    </Button>

                }
                <AlgoDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSave={handleSaveAlgorithm}
                />

                <Box sx={{}}>
                    {algorithms.toString()}
                </Box>

            </Box>
        </Paper>
    );
};

export default AlgorithmCreator;