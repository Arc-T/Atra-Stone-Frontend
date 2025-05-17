import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { API_ENDPOINT } from "../types/url";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const axiosError = error as AxiosError;
    console.log(axiosError.cause);
    console.log(axiosError.message);
    console.log(axiosError.code);
    // if (axiosError.response?.status === 403) {
    //   localStorage.removeItem("token");
    //   const navigate = useNavigate();

    //   navigate(USER_LOGIN_PAGE);
    // }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.log(
      "________________________ TOKEN IS NOT SET ________________________"
    );
  }
  return config;
});

class ApiClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAxiosInstance(): AxiosInstance {
    return axiosInstance;
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

  getRequestBody<T>(requestBody?: object, headers?: object) {
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
