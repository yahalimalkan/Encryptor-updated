import React, { type ChangeEvent} from 'react';
import {Box, Button, Typography, Paper, } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import FileImport from "./FileImport";
import {useAppContext} from "../contexts/AppContext";

const FileHandler: React.FC = () => {

    const { selectedFile, setSelectedFile } = useAppContext();

    const handleFileChange =
        (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <Paper
            sx={{
                height: "100%",
                borderRadius: 4,
            }}
        >

            <Box sx={{p: 2, textAlign: 'center'}}>
                <Typography variant="h5" gutterBottom>
                    ניהול קבצים
                </Typography>

                {!selectedFile ? (
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
                    <FileImport file={selectedFile} setFile={setSelectedFile} />
                )}
            </Box>
        </Paper>
    );
};

export default FileHandler;