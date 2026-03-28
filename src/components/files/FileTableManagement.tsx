import React, {useEffect, useMemo, useState} from 'react';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams
} from '@mui/x-data-grid';
import {
    IconButton,
    Stack,
    Box,
    Tooltip,
    Dialog,
    DialogContent,
    TextField,
    DialogTitle,
    DialogActions, Button, CircularProgress, Alert
} from '@mui/material';
import {
    Edit as EditIcon,
    Download as DownloadIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import FileApi from "../../api/FileApi";

interface FileDTO {
    id: string;
    name: string;
    size: number;
    extension: string;
}

const FileTableManagement: React.FC = () => {

    const [rows, setRows] = useState<FileDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<String | null>(null);

    // For rename action
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<FileDTO | null>(null);
    const [newName, setNewName] = useState("");

    const fetchFiles = async () => {
        try {
            setLoading(true);
            const data = await FileApi.getAllFiles();
            setRows(data);
        } catch (err) {
            setError("נכשל בטעינת קבצים מהשרת");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק קובץ זה?")) {
            try {
                await FileApi.deleteFile(id);
                setRows((prev) => prev.filter(row => row.id !== id));
            } catch (err) {
                alert("המחיקה נכשלה");
            }
        }
    };

    const handleDownload = async (id: string) => {
        try {
            const file = await FileApi.getFileById(id);
            const blob = await FileApi.downloadFile(id);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${file.name}.${file.extension}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert("הורדת הקובץ נכשלה");
        }
    };

    const handleOpenRename = async (id: string) => {
        try {
            const file = await FileApi.getFileById(id);
            setSelectedFile(file);
            setNewName(file.name);
            setRenameDialogOpen(true);
        } catch (err) {
            alert("לא ניתן לטעון את פרטי הקובץ לעריכה");
        }
    };

    const handleConfirmRename = async () => {
        if (!selectedFile || !newName || newName === selectedFile.name) {
            setRenameDialogOpen(false);
            return;
        }

        try {
            const updated = await FileApi.renameFile(selectedFile.id, newName);
            setRows((prev) => prev.map(row => row.id === selectedFile.id ? updated : row));
            setRenameDialogOpen(false);
        } catch (err) {
            alert("שינוי השם נכשל");
        }
    };

    const columns = useMemo<GridColDef<FileDTO>[]>(() => [
        {
            field: 'name',
            headerName: 'שם הקובץ',
            flex: 2,
            minWidth: 120,
            renderCell: (params: GridRenderCellParams<FileDTO>) => {
                const fullName = `${params.value}.${params.row.extension}`;
                return (
                    <Tooltip title={fullName} arrow placement="top">
                        <Box sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            cursor: 'default'
                        }}>
                            {fullName}
                        </Box>
                    </Tooltip>
                );
            }
        },
        {
            field: 'uploadDate',
            headerName: 'תאריך העלאה',
            width: 180,
            valueFormatter: (value) => value ? new Date(value).toLocaleString('he-IL') : '-'
        },
        {
            field: 'size',
            headerName: 'גודל',
            minWidth: 110,
            valueFormatter: (value) => `${(value / 1024).toFixed(1)} MB`
        },
        {
            field: 'actions',
            headerName: 'פעולות',
            width: 150,
            sortable: false,
            renderCell: (params: GridRenderCellParams<FileDTO>) => (
                <Stack direction="row" spacing={0.5} justifyContent="flex-end" width="100%">
                    <IconButton size="small" onClick={() => handleOpenRename(params.row.id)}>
                        <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDownload(params.row.id)}>
                        <DownloadIcon fontSize="small" color="success" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                </Stack>
            ),
        },
    ], []);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress size={40} />
        </Box>
    );

    if (error) return (
        <Box sx={{ p: 2 }}><Alert severity="error">{error}</Alert></Box>
    );

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                    }
                }}
            />

            <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
                <DialogTitle>עריכת שם קובץ</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="שם חדש"
                        fullWidth
                        variant="outlined"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRenameDialogOpen(false)}>ביטול</Button>
                    <Button onClick={handleConfirmRename} variant="contained" color="primary">שמור</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FileTableManagement;