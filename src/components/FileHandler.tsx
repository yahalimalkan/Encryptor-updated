import React, {useState, ChangeEvent} from 'react';
import {Box, Button, Typography, Paper, IconButton} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FileHandler: React.FC = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDeleteFile = (): void => {
        setSelectedFile(null);
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

                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: '#f9f9f9'
                        }}
                    >
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <InsertDriveFileIcon color="primary" sx={{mr: 1}}/>
                            <Box sx={{textAlign: 'left'}}>
                                <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                                    {selectedFile.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {(selectedFile.size / 1024).toFixed(1)} KB
                                </Typography>
                            </Box>
                        </Box>

                        <IconButton onClick={handleDeleteFile} color="error" title="מחק קובץ">
                            <DeleteIcon/>
                        </IconButton>
                    </Paper>
                )}
            </Box>
        </Paper>
    );
};

export default FileHandler;