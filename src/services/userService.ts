import { Order, Province, User } from "../types/admin";
import {
  USER_AUTHENTICATE_WITH_OTP_API,
  USER_CREATE_API,
  USER_LOGIN_API,
  USER_ORDERS_API,
  USER_SIGNUP_API,
  USER_SIGN_IN_API,
} from "../types/url";
import ApiClient from "./apiClient";

export const authenticate = (body: { username: string }) => {
  const apiClient = new ApiClient(USER_LOGIN_API);
  return apiClient.postRequest<{
    phone: string;
    is_registered: boolean;
    ttl: number;
  }>(body);
};

export const registerUser = (body: {
  phone: string;
  name: string;
  password: string;
  gender: string;
  province: number;
  address: string;
}) => {
  const apiClient = new ApiClient(USER_SIGNUP_API);
  return apiClient.postRequest<{ user_info: User; token: string }>(body);
};

export const authenticateWithOtp = (body: {
  username: string;
  code: string;
}) => {
  const apiClient = new ApiClient(USER_AUTHENTICATE_WITH_OTP_API);
  return apiClient.postRequest<{
    user_info: User;
    token: string;
  }>(body);
};

export const authenticateAdmin = (body: {
  phone: string;
  password: string;
}) => {
  const apiClient = new ApiClient(USER_SIGN_IN_API);
  return apiClient.postRequest<{ token: string }>(body);
};

export const getCreateData = () => {
  const apiClient = new ApiClient(USER_CREATE_API);
  return apiClient.getRequest<Province[]>();
};

export const getUserOrders = () => {
  const apiClient = new ApiClient(USER_ORDERS_API);
  return apiClient.getRequest<Order[]>();
};
