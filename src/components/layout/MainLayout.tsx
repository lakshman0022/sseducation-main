import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "../landing/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface MainLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
}

export const MainLayout = ({ children, showNav = true, showFooter = true }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showNav && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
      <Toaster />
      <Sonner />
    </div>
  );
};
