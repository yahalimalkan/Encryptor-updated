import React, { useState } from 'react';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams
} from '@mui/x-data-grid';
import { IconButton, Stack, Box, Tooltip } from '@mui/material';
import {
    Edit as EditIcon,
    Download as DownloadIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

interface FileDTO {
    id: string;
    name: string;
    size: number;
    extension: string;
}

const FileTableManagement: React.FC = () => {

    const [rows, setRows] = useState<FileDTO[]>([
        { id: '1', name: 'report_2024_internal_data_summary_v1', size: 1024, extension: 'pdf' },
        { id: '2', name: 'project_backup_full_system_march_2026', size: 5400, extension: 'zip' },
        { id: '3', name: 'short_name', size: 200, extension: 'txt' },
        { id: '3', name: 'short_name', size: 200, extension: 'txt' },
        { id: '3', name: 'short_name', size: 200, extension: 'txt' },
        { id: '3', name: 'short_name', size: 200, extension: 'txt' },
        { id: '3', name: 'short_name', size: 200, extension: 'txt' },
    ]);

    const handleRename = (file: FileDTO) => {
        console.log(`Renaming file: ${file.name}`);
    };

    const handleDownload = (file: FileDTO) => {
        console.log(`Downloading file: ${file.id}`);
    };

    const handleDelete = (file: FileDTO) => {
        setRows((prev) => prev.filter((row) => row.id !== file.id));
    };

    const columns: GridColDef<FileDTO>[] = [
        {
            field: 'name',
            headerName: 'שם הקובץ',
            // flex: 2 נותן לעמודה הזו עדיפות לגדול על חשבון האחרות
            flex: 2,
            minWidth: 120, // הגבול התחתון לפני שיופיעו 3 נקודות
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
            field: 'size',
            headerName: 'גודל',
            // flex: 1 אומר שהיא תתכווץ ותגדל יחסית, אבל פחות מעמודת השם
            flex: 1,
            minWidth: 80,
            valueFormatter: (value) => `${(value / 1024).toFixed(1)} MB`
        },
        {
            field: 'actions',
            headerName: 'פעולות',
            // כאן אנחנו משתמשים ברוחב קבוע יחסית כי הכפתורים צריכים מקום
            width: 130,
            sortable: false,
            filterable: false,
            // הצמדה לימין עוזרת בנראות במסכים קטנים
            align: 'right',
            headerAlign: 'right',
            renderCell: (params: GridRenderCellParams<FileDTO>) => (
                <Stack direction="row" spacing={0.5} justifyContent="flex-end" width="100%">
                    <IconButton size="small" onClick={() => handleRename(params.row)}>
                        <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDownload(params.row)}>
                        <DownloadIcon fontSize="small" color="success" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            '& .MuiDataGrid-root': {
                border: 'none',
            }
        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                // ביטול הצגת קווי הפרדה מיותרים שחוסך מקום ויזואלי
                columnHeaderHeight={45}
                rowHeight={50}
            />
        </Box>
    );
};

export default FileTableManagement;