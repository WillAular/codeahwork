import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { ScrollProgressBar } from "@/components/ui/fade-in";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codeah.app"),
  title: "Codeah | Desarrollo Web, Facturación e Integraciones a Medida",
  description:
    "Convertimos problemas operativos en herramientas digitales claras, conectadas y útiles. Diseñamos soluciones a medida para que tu negocio venda, se organice y crezca.",
  keywords: [
    "Codeah",
    "desarrollo web",
    "sistemas de facturación",
    "integraciones api",
    "ecommerce",
    "software a medida",
    "AFIP facturación",
    "whatsapp api integracion",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo-codeah.png",
  },
  openGraph: {
    title: "Codeah - Tecnología que hace crecer tu negocio",
    description:
      "Sitios web, sistemas de facturación e integraciones para que vendas, gestiones y escales con menos fricción.",
    images: [{ url: "/logo-codeah.png" }],
  },
};

import { MainLayoutWrapper } from "@/components/layout/MainLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[var(--blanco-calido)] text-[var(--azul-codeah)] antialiased min-h-screen flex flex-col justify-between">
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
