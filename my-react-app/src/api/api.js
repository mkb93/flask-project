import axios from 'axios';

// const API_BASE_URL = 'https://flask-project-68m0.onrender.com'; 
const API_BASE_URL = 'http://localhost:5000'; 

// Fetch items from the database
export const getItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
};

// Add a new item
export const addItem = async (item) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add-item/`, item);
        console.log(response.json)
        return response.data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};
//delete item
export const deleteItem = async (itemId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete-item/${itemId}`);
        return response.data;
    } catch (error){
        console.error("error deleting item:", error);
        return { error: "Failed to delete the item"}
    }
}