import { ChangeEvent } from "react";
import ApiClient from "./apiClient";
import {
  Attributes,
  Media,
  ProductCreateDetails,
  Products,
} from "../types/admin";
import { generateUrl } from "./general";
import { toast } from "react-toastify";
import { UPLOAD_FAILED_MSG, UPLOAD_SUCCESS_MSG } from "../types/messages";
import { AxiosError } from "axios";
import {
  ATTRIBUTE_GROUP_SHOW_API,
  MEDIA_TEMP_DELETE_API,
  MEDIA_TEMP_LIST_API,
  MEDIA_UPLOAD_API,
  PRODUCT_CREATE_API,
  PRODUCT_DELETE_API,
  PRODUCT_LIST_API,
  PRODUCT_STORE_API,
} from "../types/url";

export const formatPrice = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value.replace(/,/g, "");
  if (!isNaN(Number(value))) {
    event.target.value = Number(value).toLocaleString();
  }
};

export const getProducts = () => {
  const axiosInstance = new ApiClient(PRODUCT_LIST_API);
  return axiosInstance.getRequest<Products[]>();
};

export const getCreateDetails = () => {
  const axiosInstance = new ApiClient(PRODUCT_CREATE_API);
  return axiosInstance.getRequest<ProductCreateDetails>();
};

export const deleteProductById = (id: number) => {
  const axiosInstance = new ApiClient(
    generateUrl(PRODUCT_DELETE_API, { productId: id }, "API")
  );
  return axiosInstance.deleteRequest();
};

export const showAttributeGroupAttributes = (id: number) => {
  const axiosInstance = new ApiClient(
    generateUrl(ATTRIBUTE_GROUP_SHOW_API, { attributeGroupId: id }, "API")
  );
  return axiosInstance.getRequest<Attributes[]>();
};

export const getUploadedMedia = () => {
  const axiosInstance = new ApiClient(MEDIA_TEMP_LIST_API);
  return axiosInstance.getRequest<Media[]>();
};

export const uploadMedia = async (
  media: FormData,
  onProgress: (percentage: number) => void
) => {
  try {
    const apiClient = new ApiClient("").getAxiosInstance();

    await apiClient.post(MEDIA_UPLOAD_API, media, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 0,
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

export const deleteTempMedia = (name: string) => {
  const axiosInstance = new ApiClient(
    generateUrl(MEDIA_TEMP_DELETE_API, { mediaName: name }, "API")
  );
  return axiosInstance.deleteRequest();
};

export const storeProduct = (requestBody: Object) => {
  const axiosInstance = new ApiClient(PRODUCT_STORE_API);
  return axiosInstance.postRequest(requestBody);
};
