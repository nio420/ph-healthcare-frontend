"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import Logo from "./logo";
import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types";

const routes = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "/doctors" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

const dashboardRoutes: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  PATIENT: "/patient",
};

const HeaderPage = () => {
  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const role: UserRole | undefined = data?.data?.role || data?.data?.user?.role;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Successful",
          description: "You are now logged out",
          type: "success",
        });
        queryClient.removeQueries({
          queryKey: ["user"],
        });
      },
      onError: (err) => {
        console.error("Logout error:", err);

        toast.add({
          title: "Logout Failed",
          description: "Please try again",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="h-16 w-full border-b">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Logo />
          <span className="font-semibold">PH HealthCare</span>
        </Link>

        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              {route.name}
            </Link>
          ))}
        </nav>

        {role && dashboardRoutes[role] && (
          <Link href={dashboardRoutes[role]}>Dashboard</Link>
        )}

        <div>
          {!isLoading && !data && (
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          )}

          {!isLoading && data && (
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
