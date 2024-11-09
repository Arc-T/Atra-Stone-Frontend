import axios from "axios";

export interface LoginInput {
    phone: string;
    password: string;
}

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    timeout: 5000,
});

class ApiClient {

    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getToken(credentials: LoginInput) {
        {
            return axiosInstance
                .post(this.endpoint, credentials)
                .then(response => response.data)
        }

    }
}

export default ApiClient;
