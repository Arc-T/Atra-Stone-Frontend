import { Product, User } from "../types/admin";
import { ORDER_CREATE_API } from "../types/url";
import ApiClient from "./apiClient";

export const createOrder = (request: Object) => {
  const axiosInstance = new ApiClient(ORDER_CREATE_API);
  return axiosInstance.postRequest<{
    order_id: number;
    delivery_cost: number;
    total_price: number;
    user_info: User;
    products: Product[];
  }>(request);
};
