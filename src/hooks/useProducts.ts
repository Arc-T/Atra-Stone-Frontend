import { useMutation, useQuery } from "@tanstack/react-query";
import { Products } from "../types/admin";
import { deleteProductById, fetchProducts } from "../services/productService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  DELETE_FAILED_MSG,
  DELETE_SUCCESS_MSG,
} from "../types/messages";

export const useFetchProducts = () => {
  return useQuery<Products[]>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: Infinity,
    refetchOnMount: true,
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: number) => deleteProductById(id),
    onSuccess: () => toast.success(DELETE_SUCCESS_MSG),
    onError: (error: AxiosError) =>
      toast.error(`${DELETE_FAILED_MSG}\n${error.message}`),
  });
};


