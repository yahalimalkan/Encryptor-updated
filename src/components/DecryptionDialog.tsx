import React, {type ChangeEvent} from 'react';
import {
    Button,
    Dialog, DialogContent,
    DialogTitle,
} from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {UseAppStore} from "../store/UseAppStore";

interface DecryptionDialogProps {
    open: boolean;
    Close: () => void;
}

const DecryptionDialog: React.FC<DecryptionDialogProps> =
    ({open, Close}) => {

        const {setKeyFile} = UseAppStore();

        const handleFileChange =
            (event: ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];
                if (file) {
                    setKeyFile(file);
                }
                Close();
            };

        return (
            <Dialog open={open} onClose={Close} fullWidth maxWidth="sm">
                <DialogTitle sx={{m: 0, p: 2}}>
                    בחירת קובץ לפענוח
                </DialogTitle>

                <DialogContent dividers>
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
                </DialogContent>
            </Dialog>
        );
    };


export default DecryptionDialog;