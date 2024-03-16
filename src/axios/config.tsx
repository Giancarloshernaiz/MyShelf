import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Cambia esto por la URL base de tu API
});

export default instance;