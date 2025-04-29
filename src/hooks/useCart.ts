import { useQuery } from "@tanstack/react-query";
import { ProductInfo } from "../types/admin";
import { getCartProducts } from "../services/productService";

export const useFetchCartProducts = (ids: number[]) => {
  return useQuery<ProductInfo[]>({
    queryKey: ["cart"],
    queryFn: () => getCartProducts(ids),
    staleTime: Infinity,
    refetchOnMount: true,
  });
};