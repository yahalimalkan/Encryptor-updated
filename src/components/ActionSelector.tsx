import {
    FormControl,
    Paper,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Box,
    Collapse,
    Typography, Button
} from "@mui/material";
import FileImport from "./files/FileImport";
import {DECRYPTION, ENCRYPTION} from "../utils/Constants";
import {UseAppStore} from "../store/UseAppStore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ActionSelector = () => {
    const action = UseAppStore((state) => state.action);
    const keyFile = UseAppStore((state) => state.keyFile);

    const setAction = UseAppStore((state) => state.setAction);
    const setKeyFile = UseAppStore((state) => state.setKeyFile);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setKeyFile(file);
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
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pt: 2
            }}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">בחר סוג פעולה</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={action}
                        name="radio-buttons-group"
                        onChange={(e) => setAction(e.target.value)}
                    >
                        <FormControlLabel value={ENCRYPTION} control={<Radio/>} label={ENCRYPTION}/>
                        <FormControlLabel value={DECRYPTION} control={<Radio/>} label={DECRYPTION}/>
                    </RadioGroup>
                </FormControl>
            </Box>

            <Collapse in={action === DECRYPTION} sx={{ width: '100%' }}>
                <Box sx={{
                    mt: 2,
                    p: 2,
                    border: '1px dashed',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                    textAlign: 'center'
                }}>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                        הכנס קובץ למפתחות הפיענוח
                    </Typography>

                    {!keyFile ? (
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            size="small"
                        >
                            בחר קובץ להעלאה
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                    ) : (
                        <FileImport
                            file={keyFile}
                            setFile={setKeyFile}
                        />
                    )}
                </Box>
            </Collapse>

        </Paper>
    );
};

export default ActionSelector;