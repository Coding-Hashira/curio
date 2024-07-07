import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] pt-[50px] lg:pt-0 h-full">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
