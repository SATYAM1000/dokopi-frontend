const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

export const usersEndPoints = {
  GET_ORDER_HISRORY: `${SERVER_BASE_URL}/api/v1/user/order-history`,
  GET_ACTIVE_ORDERS: `${SERVER_BASE_URL}/api/v1/user/active-orders`,
  GET_ORDER_DETAILS: `${SERVER_BASE_URL}/api/v1/user/order-details/`,
  GET_STORES: `${SERVER_BASE_URL}/api/v1/user/stores/`,
  GET_STORE_INFO: `${SERVER_BASE_URL}/api/v1/user/stores/get-store-info/`,
  GET_ALL_STORES: `${SERVER_BASE_URL}/api/v1/user/stores/all`,
  GET_STORE_IMAGES: `${SERVER_BASE_URL}/api/v1/user/stores/store-images/`,
  GET_LOCATION: `${SERVER_BASE_URL}/api/v1/user/stores/get-location/`,
  GET_STORE_SEO: `${SERVER_BASE_URL}/api/v1/user/stores/get-store-seo/`,
  GET_SEARCH: `${SERVER_BASE_URL}/api/v1/user/stores/search`,
  GET_NEAREST_STORES: `${SERVER_BASE_URL}/api/v1/user/stores/nearest-stores`,
  GET_STORE: `${SERVER_BASE_URL}/api/v1/user/stores/`,
  GET_USER: `${SERVER_BASE_URL}/api/v1/user/`,
  GET_STORE_REVIEW: `${SERVER_BASE_URL}/api/v1/user/stores/get-store-reviews/`,
  GET_USER_REVIEW: `${SERVER_BASE_URL}/api/v1/user/get-user-reviews/`,
  GET_USER_ORDERS: `${SERVER_BASE_URL}/api/v1/user/get-user-orders/`,

  GET_USER_ADDRESS: `${SERVER_BASE_URL}/api/v1/user/get-user-addresses/`,
  ADD_USER_ADDRESS: `${SERVER_BASE_URL}/api/v1/user/add-address/`,
  UPDATE_USER_ADDRESS: `${SERVER_BASE_URL}/api/v1/user/update-address/`,
  DELETE_USER_ADDRESS: `${SERVER_BASE_URL}/api/v1/user/delete-address/`,
  GET_USER_ADDRESS: `${SERVER_BASE_URL}/api/v1/user/get-user-address/`,

  GET_USER_PROFILE: `${SERVER_BASE_URL}/api/v1/user/get-user-profile/`,
  UPDATE_USER_PROFILE: `${SERVER_BASE_URL}/api/v1/user/update-user-profile/`,

  UPDATE_USER_PASSWORD: `${SERVER_BASE_URL}/api/v1/user/update-user-password/`,
  UPDATE_USER_EMAIL: `${SERVER_BASE_URL}/api/v1/user/update-user-email/`,
  UPDATE_USER_PHONE: `${SERVER_BASE_URL}/api/v1/user/update-user-phone/`,
  GET_USER_FAVOURITES: `${SERVER_BASE_URL}/api/v1/user/get-user-favourites/`,
};
