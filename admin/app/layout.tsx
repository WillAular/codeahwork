import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codeah Admin CRM | Dashboard de Control",
  description: "Plataforma de gestión comercial y seguimiento de proyectos para el equipo de Codeah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#F8FAFC] text-[#142B5C] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
