import axios from "axios";

const BASE_URL = 'https://6a3159ef7bc5e1c612659896.mockapi.io/api/v1';

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default instance;