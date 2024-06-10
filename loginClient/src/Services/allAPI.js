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

export const generateOtpAPI = async (user) => {
  return await commonAPI("POST", `${baseUrl}/emailGeneration`, user, "");
};

export const emailOtpVerificationAPI = async (user) => {
  return await commonAPI("POST", `${baseUrl}/emailverification`, user, "");
};

export const generatePhoneOtpAPI = async (user) => {
  return await commonAPI("POST", `${baseUrl}/generatePhoneOtp`, user, "");
};

export const phoneOtpVerificationAPI = async (user) => {
  return await commonAPI("POST", `${baseUrl}/phoneVerification`, user, "");
};
