import { AxiosError } from "axios";
import { Attribute, Category, CategoryFullInfo } from "../types/admin";
import {
  CATEGORY_DELETE_API,
  CATEGORY_INDEX_API,
  CATEGORY_LIST_API,
  CATEGORY_SHOW_API,
  CATEGORY_STORE_API,
  CATEGORY_UPDATE_API,
} from "../types/url";
import ApiClient from "./apiClient";
import { generateUrl } from "./general";

export const fetchCategories = () => {
  const axiosInstance = new ApiClient(CATEGORY_INDEX_API);
  return axiosInstance.getRequest<{
    categories: Category[];
    attributes: Attribute[];
  }>();
};

export const deleteCategory = (id: number) => {
  const axiosInstance = new ApiClient(
    generateUrl(CATEGORY_DELETE_API, { categoryId: id }, "API")
  );
  return axiosInstance.deleteRequest();
};

export const updateCategory = (id: number, body: Object) => {
  const axiosInstance = new ApiClient(
    generateUrl(CATEGORY_UPDATE_API, { categoryId: id }, "API")
  );
  return axiosInstance.putRequest(body);
};

export const storeCategory = (body: Object) => {
  const axiosInstance = new ApiClient(CATEGORY_STORE_API);
  return axiosInstance.postRequest(body);
};

export const fetchCategoryFullInfo = (id: number) => {
  const axiosInstance = new ApiClient(
    generateUrl(CATEGORY_SHOW_API, { categoryId: id }, "API")
  );
  return axiosInstance.getRequest<CategoryFullInfo>();
};

export const fetchCategoryList = () => {
  const axiosInstance = new ApiClient(CATEGORY_LIST_API);
  return axiosInstance
    .getRequest<Category[]>()
    .then((response) => response) // return the response
    .catch((error: AxiosError) => {
      console.log(error.message);
      throw error; // optional: rethrow to handle in useQuery
    });
};
