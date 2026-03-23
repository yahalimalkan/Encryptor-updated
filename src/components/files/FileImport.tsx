import React from "react";
import {Box, IconButton, Paper, Typography} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";


interface FileImportProps {
    file: File | null;
    setFile: (file: File | null) => void;
}

const FileImport: React.FC<FileImportProps> = ({file, setFile}) => {

    const handleDeleteFile = (): void => {
        setFile(null);
    };

    if (!file) {
        return (
            <Typography variant="body2" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
                אנא בחר קובץ להמשך...
            </Typography>
        );
    }

    return (
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
                        {file.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {(file.size / 1024).toFixed(1)} KB
                    </Typography>
                </Box>
            </Box>

            <IconButton onClick={handleDeleteFile} color="error" title="מחק קובץ">
                <DeleteIcon/>
            </IconButton>
        </Paper>
    )
}

export default FileImport;