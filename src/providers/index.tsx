"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAuthProvider } from "./google-auth-provide";
import { QueryProvider } from "./queryProvide";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleAuthProvider>
      {" "}
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </GoogleAuthProvider>
  );
}
