import { useMutation, useQuery } from "@tanstack/react-query";
import { STORE_FAILED_MSG, STORE_SUCCESS_MSG } from "../types/messages";
import { toast } from "react-toastify";
import { fetchCategoryList, storeCategory } from "../services/categoryService";
import { AxiosError } from "axios";
import { Category } from "../types/admin";

export const useStoreCategory = () => {
  return useMutation({
    mutationFn: (body: Object) => storeCategory(body),
    onSuccess: () => toast.success(STORE_SUCCESS_MSG),
    onError: (error: AxiosError) =>
      toast.error(`${STORE_FAILED_MSG}\n${error.message}`),
  });
};

export const useFetchCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategoryList,
    staleTime: 3600000, //1 hour
    refetchOnMount: true,
  });
};