import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 3000,
});

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     console.log(response.status);
//     return response;
//   },
//   (error: AxiosError) => {
//     const axiosError = error as AxiosError;

//     if (axiosError.response?.status === 403) {
//       localStorage.removeItem("token");

//       window.location.href = "/admin/home";
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  console.log(config.headers);

  return config;
});

class ApiClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
    return this;
  }

  getRequest<T>(headers?: object) {
    return axiosInstance
      .get<T>(this.endpoint, headers ? { headers } : undefined)
      .then((response) => {
        return response.data;
      });
  }

  postRequest<T>(requestBody?: object, headers?: object) {
    return axiosInstance
      .post<T[]>(this.endpoint, requestBody, headers ? { headers } : undefined)
      .then((response) => response.data)
      .catch((error) => error);
  }
  
  deleteRequest<T>(requestBody?: object) {
    return axiosInstance
      .delete<T[]>(this.endpoint, requestBody)
      .then((response) => response.data)
      .catch((error) => error);
  }
}

export default ApiClient;
