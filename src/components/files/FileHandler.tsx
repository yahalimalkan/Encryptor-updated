import {type ChangeEvent, useState} from 'react';
import {
    Button,
    Typography,
    Paper,
    Stack,
    DialogTitle,
    Dialog,
    IconButton,
    DialogContent,
    DialogActions
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileImport from "./FileImport";
import {UseAppStore} from "../../store/UseAppStore";
import CloseIcon from '@mui/icons-material/Close';
import FileTableManagement from "./FileTableManagement";
import {

    Visibility as ShowIcon
} from '@mui/icons-material';

const FileHandler: React.FC = () => {

    const {mainFile, setMainFile} = UseAppStore();
    const [openTable, setOpenTable] = useState<boolean>(false);

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

                <Button
                    component="label"
                    variant="contained"
                    startIcon={<ShowIcon />}
                    onClick={() => setOpenTable(true)} // פתיחת הדיאלוג
                >
                    נהל קבצים בשרת
                </Button>

                <Dialog
                    open={openTable}
                    onClose={() => setOpenTable(false)}
                    fullWidth
                    maxWidth="md" // נותן לטבלה רוחב מקסימלי נוח (Medium)
                    scroll="paper" // גורם לגלילה להיות רק בתוך התוכן של הדיאלוג
                >
                    <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">ניהול קבצים מהשרת</Typography>
                        <IconButton onClick={() => setOpenTable(false)}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    {/* NEW: ה-dividers יוצרים קווים מפרידים מעל ומתחת לטבלה */}
                    <DialogContent dividers sx={{ height: '60vh', p: 0 }}>
                        <FileTableManagement />
                    </DialogContent>

                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setOpenTable(false)} variant="outlined">
                            סגור
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Paper>
    );
};

export default FileHandler;