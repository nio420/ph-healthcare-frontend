import {
  googleoAuthApi,
  userGetMe,
  userLoginApi,
  userLogoutApi,
  userRegistration,
  verifyAccountApi,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLoginApi,
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyAccountApi,
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: userLogoutApi,
  });
};
export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: userGetMe,
    retry: false,
  });
};

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: googleoAuthApi,
  });
};

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}
