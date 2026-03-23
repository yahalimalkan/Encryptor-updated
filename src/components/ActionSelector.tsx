import {FormControl, Paper, FormLabel, RadioGroup, Radio, FormControlLabel, Box} from "@mui/material";
import {useState} from "react";
import DecryptionDialog from "./DecryptionDialog";
import FileImport from "./FileImport";
import {useAppContext} from "../contexts/AppContext";
import {DECRYPTION, ENCRYPTION} from "../utils/Constants";

const ActionSelector = () => {
    const {keyFile, setKeyFile} = useAppContext();

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleDecryptionChoice = (): void => {
        setIsDialogOpen(true);
    }

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
                pt: 2
            }}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Choose action</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={ENCRYPTION}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value={ENCRYPTION} control={<Radio/>} label={ENCRYPTION}
                                          onChange={() => {
                                              setKeyFile(null)
                                          }}/>
                        <FormControlLabel value={DECRYPTION} control={<Radio/>} label={DECRYPTION}
                                          onChange={handleDecryptionChoice}/>
                    </RadioGroup>
                </FormControl>
            </Box>

            {keyFile && (
                <Box sx={{width: '100%', mt: 2}}>
                    <FileImport
                        file={keyFile}
                        setFile={setKeyFile}
                    />
                </Box>
            )}

            {isDialogOpen && (
                <DecryptionDialog
                    open={isDialogOpen}
                    Close={() => setIsDialogOpen(false)}
                />
            )}

        </Paper>
    );
};

export default ActionSelector;