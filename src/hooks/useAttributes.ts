import { useMutation } from "@tanstack/react-query";
import { storeAttribute } from "../services/attributeService";
import { STORE_FAILED_MSG, STORE_SUCCESS_MSG } from "../types/messages";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useStoreAttribute = () => {
  return useMutation({
    mutationFn: (body: Object) => storeAttribute(body),
    onSuccess: () => toast.success(STORE_SUCCESS_MSG),
    onError: (error: AxiosError) =>
      toast.error(`${STORE_FAILED_MSG}\n${error.message}`),
  });
};
