import apiClient from './ApiClient';
import type {FileDTO} from "../models/FileTypeDto";
import {API_BASE_URL} from "../utils/Constants";

const FileApi = {
    uploadFile: async (file: File): Promise<FileDTO> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post<FileDTO>('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },

    getAllFiles: async (): Promise<FileDTO[]> => {
        const response = await apiClient.get<FileDTO[]>(`${API_BASE_URL}/files`);
        return response.data;
    },

    deleteFile: async (id: string): Promise<void> => {
        await apiClient.delete(`${API_BASE_URL}/files/${id}`);
    },

    renameFile: async (id: string, newName: string): Promise<FileDTO> => {
        const response = await apiClient.patch<FileDTO>(`${API_BASE_URL}/files/${id}`, {
            name: newName
        });
        return response.data;
    },

    downloadFile: async (id: string): Promise<Blob> => {
        const response = await apiClient.get(`${API_BASE_URL}/files/${id}/download`, {
            responseType: 'blob',
        });
        return response.data;
    },

    getFileById: async (id: string): Promise<FileDTO> => {
        const response = await apiClient.get<FileDTO>(`/files/${id}`);
        return response.data;
    },
};

export default FileApi;