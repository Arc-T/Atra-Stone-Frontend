import { useMutation } from "@tanstack/react-query";
import { AUTH_FAILED } from "../types/messages";
import { toast } from "react-toastify";
import { ADMIN_HOMEPAGE } from "../types/url";
import { LoginInputs } from "../pages/admin/auth/authType";
import { authenticate } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const useAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (requestBody: LoginInputs) => authenticate(requestBody),
    onSuccess: (response) => {
      console.log(response);
      localStorage.setItem("token", response.token);
      navigate(`/${ADMIN_HOMEPAGE}`);
    },
    onError: (error:AxiosError) => {
      toast.error(AUTH_FAILED);
      console.log(error.cause);
      console.log(error.message);
      console.log(error.name);
      console.log(error.code);
      console.log(error.response);
      console.log(error.isAxiosError);
    },
  });
};
