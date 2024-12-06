// api.jsx
import axios from 'axios';

const API_BASE_URL = "https://clientapis.fresh-connect.online/"; // Replace with your base URL

// Configure default axios instance with base URL
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Common API endpoints
export const apiEndpoints = {
    register: "api/users/register",
    login: "api/users/login",
    updateprofile:"api/users/updateprofile",
    getuser:"api/users",
    updateAccommodation:"api/users/updateaccomidation",
    updateuniversity :"api/users/updateuniversity",
    groceries : "api/groceries",
    transport :"api/transport",
    accomidations : "api/accommodation",
    accommodationadd : "api/accommodation/accommodation",
    events: "api/events"

      // Omit :id placeholder
};
export const Base_url = "https://clientapis.fresh-connect.online";

// API call helper functions

export default apiClient;
