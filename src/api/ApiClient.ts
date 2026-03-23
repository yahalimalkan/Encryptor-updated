import axios from 'axios';
import {API_BASE_URL} from "../utils/Constants";

const apiClient = axios.create({
    baseURL: API_BASE_URL, // הגדרה מרכזית אחת
    timeout: 5000,
});

export default apiClient;