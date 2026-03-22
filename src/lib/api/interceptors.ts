import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "../../types/api";
import { axiosClient } from "./api";


// REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  (error: AxiosError): Promise<never> => {
    let normalizedError: ApiError = {
      message: "Something went wrong",
    };

    if (!error.response) {
      normalizedError.message = "Network error";
      console.error("Network error:", error);
      return Promise.reject(normalizedError);
    }

    const { status, data } = error.response;

    normalizedError = {
      status,
      message:
        (data as any)?.message || error.message || "Unexpected error",
      data,
    };

    switch (status) {
      case 400:
        console.error("Bad Request:", normalizedError.message);
        break;

      case 401:
        console.warn("Unauthorized → redirect login");
        break;

      case 403:
        console.error("Forbidden");
        break;

      case 404:
        console.error("Not Found");
        break;

      case 500:
        console.error("Server Error");
        break;

      default:
        console.error("Unhandled error:", normalizedError.message);
    }

    return Promise.reject(normalizedError);
  }
);

export default axiosClient;