import axios from "axios";

// Create an Axios instance with base configuration
export const axiosInstance = axios.create({
  withCredentials: true, // This can be made dynamic if necessary
});

// Function to set the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Generic API Connector
export const apiConnector = (
  method,
  url,
  data = null,
  headers = {},
  params = {}
) => {
  return axiosInstance({
    method,
    url,
    data,
    headers,
    params,
  });
};

// Function to handle API requests with optional authentication
const handleRequest = async (
  method,
  endpoint,
  data = null,
  requiresAuth = false
) => {
  try {
    // If the request requires authentication, ensure the token is set
    if (requiresAuth) {
      const token = localStorage.getItem("authToken"); // Retrieve the token from storage
      setAuthToken(token);
    }

    // Make the API call using the apiConnector
    const response = await apiConnector(method, endpoint, data);
    return response.data; // Return the response data
  } catch (error) {
    console.error(`API ${method.toUpperCase()} call failed:`, error);
    throw error; // Re-throw the error for external handling
  }
};

// Specific API methods
export const fetchData = (endpoint, requiresAuth = false) =>
  handleRequest("get", endpoint, null, requiresAuth);

export const postData = (endpoint, data, requiresAuth = false) =>
  handleRequest("post", endpoint, data, requiresAuth);

export const updateData = (endpoint, data, requiresAuth = false) =>
  handleRequest("put", endpoint, data, requiresAuth);

export const deleteData = (endpoint, requiresAuth = false) =>
  handleRequest("delete", endpoint, null, requiresAuth);
