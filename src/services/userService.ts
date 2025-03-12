import { LoginInputs, TokenResponse } from "../pages/admin/auth/authType";
import { USER_LOGIN_API } from "../types/url";
import ApiClient from "./apiClient";

export const authenticate = (requestBody: LoginInputs) => {
  const apiClient = new ApiClient(USER_LOGIN_API);
  return apiClient.postRequest<TokenResponse>(requestBody);
};