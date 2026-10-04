"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollProgressBar } from "@/components/ui/fade-in";
import { AuthProvider } from "@/context/AuthContext";
import { AdminThemeProvider } from "@/context/AdminThemeContext";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <AuthProvider>
        <AdminThemeProvider>
          <div className="min-h-screen font-inter antialiased">
            {children}
          </div>
        </AdminThemeProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <WhatsAppButton />
      <StickyMobileCTA />
      <Footer />
    </AuthProvider>
  );
}
