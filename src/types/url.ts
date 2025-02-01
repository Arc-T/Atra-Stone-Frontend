// export const SERVER_URL = 'https://atrastones.com/api/v1'

const BASE_URL = "http://localhost:8080/";
// const BASE_URL = "https://atrastones.com/";
const API_VERSION = "api/v1/";

export const SERVER_URL = BASE_URL;
export const SERVER_API_VERSION = API_VERSION;

export const API_ENDPOINT = `${BASE_URL}${API_VERSION}`;

export const ADMIN_HOMEPAGE = "admin/home/";

export const USER_HOMEPAGE = "user/home";
export const USER_LOGIN_PAGE = "user/home";

export const USER_LOGIN_API = "users/auth/sign-in";

/* ************************* PRODUCT API  ************************* */
export const PRODUCT_LIST_API = "products/index";
export const PRODUCT_STORE_API = "products/store";
export const PRODUCT_CREATE_API = "products/create";
export const PRODUCT_DELETE_API = "products/{productId}/delete";
export const PRODUCT_DETAILS_API = "media/products/{productId}/{productName}";

/* ************************* PRODUCT PAGE  ************************* */
export const PRODUCT_EDIT_PAGE = "admin/products/{productId}/edit";

/* ************************* MEDIA API  ************************* */
export const MEDIA_SHOW_API = "media/{productId}/show";
export const MEDIA_UPLOAD_API = "media/upload";
export const MEDIA_DELETE_API = "media/delete";
export const MEDIA_TEMP_LIST_API = "media/list-tmp";
export const MEDIA_TEMP_DELETE_API = "media/{mediaName}/delete-tmp";

/* ************************* MEDIA URL  ************************* */
export const MEDIA_SHOW_URL = `${BASE_URL}media/products/tmp/`;

export const ATTRIBUTE_GROUP_SHOW_API = "attributes/{attributeGroupId}/show";
