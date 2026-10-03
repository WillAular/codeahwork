"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, MessageSquareCode } from "lucide-react";
import { ContactModal } from "@/components/sections/ContactModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "glass-header shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-36 sm:w-44 transition-transform duration-200 group-hover:scale-[1.02]">
                <Image
                  src="/logo-codeah.png"
                  alt="Codeah - Soluciones Digitales"
                  fill
                  sizes="(max-width: 768px) 150px, 180px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--azul-codeah)]">
              <a
                href="#servicios"
                className="hover:text-[var(--dorado-codeah)] transition-colors py-1"
              >
                Servicios
              </a>
              <a
                href="#como-trabajamos"
                className="hover:text-[var(--dorado-codeah)] transition-colors py-1"
              >
                Cómo trabajamos
              </a>
              <a
                href="#cotizador"
                className="hover:text-[var(--dorado-codeah)] transition-colors py-1"
              >
                Calculadora
              </a>
              <a
                href="#casos"
                className="hover:text-[var(--dorado-codeah)] transition-colors py-1"
              >
                Soluciones
              </a>
              <a
                href="#contacto"
                className="hover:text-[var(--dorado-codeah)] transition-colors py-1"
              >
                Contacto
              </a>
            </nav>

            {/* Desktop Action CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#contacto">
                <Button variant="gold" size="default" className="group cursor-pointer">
                  <span>Hablemos de tu proyecto</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[var(--azul-codeah)] hover:bg-[var(--gris-azulado)] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-3 font-medium text-[var(--azul-codeah)]">
              <a
                href="#servicios"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-[var(--gris-azulado)] transition-colors"
              >
                Servicios principales
              </a>
              <a
                href="#como-trabajamos"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-[var(--gris-azulado)] transition-colors"
              >
                Cómo trabajamos
              </a>
              <a
                href="#cotizador"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-[var(--gris-azulado)] transition-colors"
              >
                Calculadora de proyectos
              </a>
              <a
                href="#casos"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-[var(--gris-azulado)] transition-colors"
              >
                Soluciones reales
              </a>
            </nav>
            <div className="pt-2">
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full justify-center"
                >
                  Hablemos de tu proyecto
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </>
  );
}
