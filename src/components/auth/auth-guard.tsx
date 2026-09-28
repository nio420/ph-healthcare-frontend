"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import AuthLoading from "./auth-loading";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  console.log(data);

  const user = data?.data;

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isError, user, isPending]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting...." />;
  }

  return <div>
    {children}
    </div>;
};

export default AuthGuard;
