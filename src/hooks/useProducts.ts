import { useMutation, useQuery } from "@tanstack/react-query";
import { Product } from "../types/admin";
import {
  deleteProductById,
  getProducts,
  getUploadedMedia,
  showProductInfo,
} from "../services/productService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  DELETE_FAILED_MSG,
  DELETE_SUCCESS_MSG,
  FETCH_FAILED_MSG,
} from "../types/messages";

export const useFetchProducts = () => {
  return useQuery<Produc[]>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
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

export const useShowProduct = () => {
  return useMutation({
    mutationFn: (id: number) => showProductInfo(id),
    onError: () => {
      toast.error(FETCH_FAILED_MSG);
    },
  });
};

export const useFetchMedia = () => {
  return useMutation({
    mutationFn: () => getUploadedMedia(),
    onError: (error: AxiosError) =>
      toast.error(`${DELETE_FAILED_MSG}\n${error.message}`),
  });
};
