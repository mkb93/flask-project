import axios from 'axios';

const API_BASE_URL = 'https://flask-project-68m0.onrender.com'; 

// Fetch items from the database
export const getItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/test-db`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
};

// Add a new item
export const addItem = async (item) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add-item`, item);
        return response.data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};