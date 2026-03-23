import {Box, Button, Chip, Paper, Stack} from "@mui/material";
import {useState} from "react";
import AlgoDialog from "./AlgoDialog";
import {useAppContext} from "../contexts/AppContext";

export interface AlgorithmConfig {
    type: string;
    child?: AlgorithmConfig;
    childA?: AlgorithmConfig;
    childB?: AlgorithmConfig;
}

const AlgorithmCreator: React.FC = () => {

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const { algorithms, setAlgorithms } = useAppContext();

    const handleSaveAlgorithm = (newAlgo: string[]): void => {
        const hasEmpty = newAlgo.some(item => item === "");
        if (hasEmpty) {
            alert("Please enter valid Algorithms");
            setIsDialogOpen(true);
        } else {
            setAlgorithms(newAlgo);
            setIsDialogOpen(false);
        }
    };

    return (
        <Paper
            sx={{
                height: "100%",
                borderRadius: 4,
            }}
        >
            <Box sx={{
                minHeight: "20vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
                py: 1
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
                            onClick={() => setAlgorithms([])}
                    >
                        מחק אלגוריתמים
                    </Button>

                }
                <AlgoDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSave={handleSaveAlgorithm}
                />

                <Box sx={{
                    mt: 4
                }}>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center">
                        {algorithms.map((algo, index) => (
                            <Chip
                                key={index}
                                label={algo}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                </Box>

            </Box>
        </Paper>
    );
};

export default AlgorithmCreator;