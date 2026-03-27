import {type ChangeEvent, useState} from 'react';
import {Button, Typography, Paper, Box, Stack} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileImport from "./FileImport";
import {UseAppStore} from "../../store/UseAppStore";
import FileTableManagement from "./FileTableManagement";
import {
    VisibilityOff as HideIcon,
    Visibility as ShowIcon
} from '@mui/icons-material';

const FileHandler: React.FC = () => {

    const {mainFile, setMainFile} = UseAppStore();
    const [showTable, setShowTable] = useState<boolean>(true);

    const handleFileChange =
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                setMainFile(file);
            }
        };

    return (
        <Paper
            sx={{
                flex: 1,
                height: '100%',
                maxHeight: '80vh',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            <Stack
                spacing={2}
                sx={{
                    p: 3,
                    flex: 1,
                    minHeight: 0,
                    overflow: 'hidden',
                    width: '100%',
                }} alignItems="center">
                <Typography variant="h5" gutterBottom>
                    ניהול קבצים
                </Typography>

                {!mainFile ? (
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon/>}
                    >
                        בחר קובץ להעלאה
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                ) : (
                    <FileImport file={mainFile} setFile={setMainFile}/>
                )}

                {/* כפתור השליטה */}
                <Button
                    variant="contained"
                    color={showTable ? "secondary" : "primary"}
                    startIcon={showTable ? <HideIcon/> : <ShowIcon/>}
                    onClick={() => setShowTable(!showTable)}
                >
                    {showTable ? "הסתר טבלת קבצים" : "הצג טבלת קבצים"}
                </Button>

                {showTable && (
                    <Box sx={{
                        flex: 1,
                        width: '100%',
                        minHeight: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid #eee',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}>

                        <Box sx={{ flex: 1, minHeight: 0, width: '100%' }}>
                            <FileTableManagement />
                        </Box>
                    </Box>
                )}

            </Stack>
        </Paper>
    );
};

export default FileHandler;