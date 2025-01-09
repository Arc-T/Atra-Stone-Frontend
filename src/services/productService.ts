import { ChangeEvent } from "react";
import ApiClient from "./apiClient";
import {
  ATTRIBUTE_GROUP_SHOW_API,
  MEDIA_STORE_API,
  PRODUCT_CREATE_API,
  PRODUCT_DELETE_API,
  PRODUCT_LIST_API,
} from "../types/url";
import { Attributes, ProductCreateDetails, Products } from "../types/admin";
import { generateUrl } from "./general";
import { toast } from "react-toastify";
import { UPLOAD_FAILED_MSG, UPLOAD_SUCCESS_MSG } from "../types/messages";
import { AxiosError } from "axios";

export const formatPrice = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value.replace(/,/g, "");
  if (!isNaN(Number(value))) {
    event.target.value = Number(value).toLocaleString();
  }
};

export const fetchProducts = () => {
  const axiosInstance = new ApiClient(PRODUCT_LIST_API);
  return axiosInstance.getRequest<Products[]>();
};

export const fetchCreateDetails = () => {
  const axiosInstance = new ApiClient(PRODUCT_CREATE_API);
  return axiosInstance.getRequest<ProductCreateDetails>();
};

export const deleteProductById = (id: number) => {
  const axiosInstance = new ApiClient(
    generateUrl(PRODUCT_DELETE_API, { productId: id })
  );
  return axiosInstance.deleteRequest();
};

export const showAttributeGroupAttributes = (id: number) => {
  const axiosInstance = new ApiClient(
    generateUrl(ATTRIBUTE_GROUP_SHOW_API, { attributeGroupId: id }, "API")
  );
  return axiosInstance.getRequest<Attributes[]>();
};

export const uploadMedia = async (
  media: FormData,
  onProgress?: (percentage: number) => void
) => {
  try {
    const apiClient = new ApiClient("").getAxiosInstance();

    await apiClient.post(MEDIA_STORE_API, media, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        if (event.total && onProgress) {
          const percentage = Math.round((event.loaded * 100) / event.total);
          onProgress(percentage); // Pass progress percentage to callback
        }
      },
    });
    toast.success(UPLOAD_SUCCESS_MSG);
  } catch (error) {
    const axiosError = error as AxiosError;
    toast.error(UPLOAD_FAILED_MSG + axiosError.message);
  }
};
