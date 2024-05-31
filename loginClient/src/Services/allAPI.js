import { baseUrl } from "./baseURL";
import { commonAPI } from "./commonAPI";

export const registerAPI = async (user) => {
  return await commonAPI("POST", `${baseUrl}/api/register`, user, "");
};

export const loginAPI = async (user) => {
  return await commonAPI("POST", `${baseUrl}/api/login`, user, "");
};

export const googleLoginAPI = async (user) => {
  return await commonAPI("POST", `${baseUrl}/api/googleLogin`, user, "");
};
