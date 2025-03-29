import { useMutation } from "@tanstack/react-query";
import { STORE_FAILED_MSG, STORE_SUCCESS_MSG } from "../types/messages";
import { toast } from "react-toastify";
import { storeCategory } from "../services/categoryService";
import { AxiosError } from "axios";

export const useStoreCategory = () => {
    return useMutation({
      mutationFn: (body: Object) => storeCategory(body),
      onSuccess: () => toast.success(STORE_SUCCESS_MSG),
      onError: (error: AxiosError) =>
        toast.error(`${STORE_FAILED_MSG}\n${error.message}`),
    });
  };