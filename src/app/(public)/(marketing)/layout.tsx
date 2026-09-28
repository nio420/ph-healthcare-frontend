import Footer from "@/components/layout/public/footer";
import HeaderPage from "@/components/layout/public/header";
import React, { ReactNode } from "react";

const layoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPage />
      <main className="flex-1"> {children}</main>
      <Footer />
    </div>
  );
};

export default layoutPage;
