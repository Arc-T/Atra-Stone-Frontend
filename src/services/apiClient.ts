import axios, {
  AxiosError,
  AxiosResponse,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 3000,
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

class ApiClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  }

  getRequest<T>() {
    return axiosInstance
      .get<T[]>(this.endpoint)
      .then((response) => response.data)
      .catch((error) => error);
  }

  postRequest<T>(requestBody?: object, headers?: object) {
    return axiosInstance
      .post<T[]>(this.endpoint, requestBody, headers ? { headers } : undefined)
      .then((response) => response.data)
      .catch((error) => error);
  }
}

export default ApiClient;