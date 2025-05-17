import { OrderFullInfo, Product, User } from "../types/admin";
import { ORDER_CREATE_API, ORDER_SHOW_API } from "../types/url";
import ApiClient from "./apiClient";
import { generateUrl } from "./general";

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

export const showUserOrder = (id: string) => {
  const axiosInstance = new ApiClient(
    generateUrl(ORDER_SHOW_API, { orderId: id }, "API")
  );

  return axiosInstance.getRequest<OrderFullInfo>();
};
