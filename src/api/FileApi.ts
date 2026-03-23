import apiClient from './ApiClient';

// 1. הגדרת טיפוסים (Interfaces) - כמו ה-DTOs שלך ב-Java
export interface FileStatus {
    id: string;
    fileName: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    uploadDate: string;
}

/**
 * קובץ ה-API שמרכז את כל הפעולות מול /api/files
 */

// בקשה 1: העלאת קובץ להצפנה (POST)
export const encryptFile = async (file: File, algorithm: string): Promise<FileStatus> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('algo', algorithm);

    const response = await apiClient.post('/files/encrypt', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// בקשה 2: קבלת פרטי קובץ ספציפי (GET עם Path Variable)
export const getFileDetails = async (fileId: string): Promise<FileStatus> => {
    const response = await apiClient.get(`/files/${fileId}`);
    return response.data;
};

// בקשה 3: מחיקת קובץ מהשרת (DELETE)
export const deleteFile = async (fileId: string): Promise<void> => {
    await apiClient.delete(`/files/${fileId}`);
};

// בקשה 4: הורדת קובץ מוצפן (GET שמחזיר קובץ/Blob)
export const downloadEncryptedFile = async (fileId: string): Promise<Blob> => {
    const response = await apiClient.get(`/files/download/${fileId}`, {
        responseType: 'blob' // חשוב מאוד כדי לקבל נתונים בינאריים ולא JSON
    });
    return response.data;
};