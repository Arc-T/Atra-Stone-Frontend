import { useMutation, useQuery } from "@tanstack/react-query";
import { Product } from "../types/admin";
import {
  getProducts,
  getUploadedMedia,
  showProductInfo,
} from "../services/productService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  DELETE_FAILED_MSG,
  FETCH_FAILED_MSG,
} from "../types/messages";

export const useFetchProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: Infinity,
    refetchOnMount: true,
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