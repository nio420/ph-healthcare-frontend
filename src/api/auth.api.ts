import apiClient from "@/lib/apiClient";
import { GoogleLoginPayload, LoginPayload, RegistrationPayload, verifyAccountPayload } from "@/types";

export function userRegistration(payload: RegistrationPayload) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export const userLoginApi = (paylaod: LoginPayload) => {
  return apiClient("/auth/login", { method: "POST", body: paylaod });
};

export const verifyAccountApi = (paylaod: verifyAccountPayload) => {
  return apiClient("/auth/verify-email", { method: "POST", body: paylaod });
};

export const userLogoutApi = () => {
  return apiClient("/auth/logout", { method: "POST" });
};

export const userGetMe = () => {
  return apiClient("/auth/me");
};

export const googleoAuthApi = (payload: GoogleLoginPayload) => {
  return apiClient("/auth/google", { method: "POST", body: payload });
};

