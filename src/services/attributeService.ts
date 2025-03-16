import { AttributeIndex } from "../types/admin";
import {
  ATTRIBUTE_DELETE_API,
  ATTRIBUTE_INDEX_API,
  ATTRIBUTE_STORE_API,
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

export const deleteAttribute = (attrId: number) => {
  const axiosInstance = new ApiClient(
    generateUrl(ATTRIBUTE_DELETE_API, { attributeId: attrId }, "API")
  );
  return axiosInstance.deleteRequest();
};
