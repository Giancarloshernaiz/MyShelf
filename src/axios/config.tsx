import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Cambia esto por la URL base de tu API
    timeout: 5000, // Cambia esto por el tiempo de espera deseado en milisegundos
});

export default instance;