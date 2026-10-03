"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { ScrollProgressBar } from "@/components/ui/fade-in";
import { AuthProvider } from "@/context/AuthContext";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 font-inter antialiased">
          {children}
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <StickyMobileCTA />
      <Footer />
    </AuthProvider>
  );
}
