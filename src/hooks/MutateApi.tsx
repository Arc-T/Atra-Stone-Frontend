import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiClient from "../services/apiClient";


const MutateApi = (requestPrams?: object) => {

    const navigate = useNavigate();

    const axiosClient = new ApiClient('products/list');
  
    return useMutation({
      mutationFn: () => axiosClient.getData(),
      onSuccess: (response) => {

      },
      onError: (error: AxiosError) => {
        
        localStorage.removeItem('token');
        navigate('/admin/home');
      },
    });
  };

export default MutateApi;
