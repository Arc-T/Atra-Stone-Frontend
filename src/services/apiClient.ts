import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080/api/v1/",
  baseURL: "https://atrastones.com/api/v1/",
  timeout: 2000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response.status);
    return response;
  },
  (error: AxiosError) => {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 403) {
      localStorage.removeItem("token");

      window.location.href = "/admin/home";
    }

    return Promise.reject(error);
  }
);

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
      .then((response) => response.data);
  }

  postRequest<T>(requestBody?: object, headers?: object) {
    return axiosInstance
      .post<T>(this.endpoint, requestBody, headers ? { headers } : undefined)
      .then((response) => response.data);
  }

  deleteRequest<T>(requestBody?: object) {
    return axiosInstance
      .delete<T>(this.endpoint, { data: requestBody })
      .then((response) => response.data);
  }

  patchRequest<T>(requestBody?: object, headers?: object) {
    return axiosInstance
      .patch<T>(this.endpoint, requestBody, headers ? { headers } : undefined)
      .then((response) => response.data);
  }

  putRequest<T>(requestBody?: object, headers?: object) {
    return axiosInstance
      .put<T>(this.endpoint, requestBody, headers ? { headers } : undefined)
      .then((response) => response.data);
  }
}

export default ApiClient;
