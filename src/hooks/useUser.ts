import { useMutation } from "@tanstack/react-query";
import { AUTH_FAILED_MSG } from "../types/messages";
import { toast } from "react-toastify";
import { ADMIN_HOMEPAGE } from "../types/url";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { authenticateAdmin } from "../services/userService";

export const useAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (requestBody: { phone: string; password: string }) =>
      authenticateAdmin({
        phone: requestBody.phone,
        password: requestBody.password,
      }),
    onSuccess: (response) => {
      localStorage.setItem("admin", response.token);
      navigate(`/${ADMIN_HOMEPAGE}`);
    },
    onError: (error: AxiosError) => {
      toast.error(AUTH_FAILED_MSG + error.message);
    },
  });
};