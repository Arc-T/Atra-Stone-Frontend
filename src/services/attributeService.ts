import { Attribute, AttributeIndex } from "../types/admin";
import {
  ATTRIBUTE_DELETE_API,
  ATTRIBUTE_INDEX_API,
  ATTRIBUTE_STORE_API,
  CATEGORY_ATTRIBUTE_SHOW_API,
} from "../types/url";
import ApiClient from "./apiClient";
import { generateUrl } from "./general";

export const storeAttribute = (body: Object) => {
  const axiosInstance = new ApiClient(ATTRIBUTE_STORE_API);
  return axiosInstance.postRequest(body);
};

export const fetchAttributeIndex = () => {
  const axiosInstance = new ApiClient(ATTRIBUTE_INDEX_API);
  return axiosInstance.getRequest<AttributeIndex>();
};

export const fetchCategoryAttributes = (id: string) => {
  const axiosInstance = new ApiClient(
    generateUrl(CATEGORY_ATTRIBUTE_SHOW_API, { categoryId: id }, "API")
  );
  return axiosInstance.getRequest<Attribute[]>();
};

export const deleteAttribute = (attrId: number) => {
  const axiosInstance = new ApiClient(
    generateUrl(ATTRIBUTE_DELETE_API, { attributeId: attrId }, "API")
  );
  return axiosInstance.deleteRequest();
};
