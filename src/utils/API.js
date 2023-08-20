import axios from "axios";
import { BASE_URL, VERSION_PATH } from "./constants";

export const cafeServiceApi = axios.create({
  baseURL: `${BASE_URL.CAFE_SERVICE}${VERSION_PATH.CAFE_SERVICE}`,
});

cafeServiceApi.interceptors.request.use(
  (config) => {
    const baseUrl = config?.base ? config?.base : BASE_URL.CAFE_SERVICE;
    const versionPath = config?.version
      ? `/api/${config?.version}`
      : VERSION_PATH.CAFE_SERVICE;
    const baseURL = `${baseUrl}${versionPath}`;
    return { ...config, baseURL };
  },
  (error) => {
    return new Promise.reject(error);
  },
);
export const API = {
  cafeServiceApi,
};

export default API;
