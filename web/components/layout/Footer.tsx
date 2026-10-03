"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--azul-profundo)] text-white border-t border-slate-800 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Logo & Vision */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative h-10 w-44">
              <Image
                src="/logo-codeah-light.png"
                alt="Codeah"
                fill
                sizes="180px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Convertimos problemas operativos en herramientas digitales claras, conectadas y útiles. Soluciones a medida para que tu negocio venda y se organice mejor.
            </p>
            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/codeah-sistemas-783b16305/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/10 hover:border-amber-400/40 transition-all"
                aria-label="LinkedIn de Codeah"
              >
                <IconBrandLinkedin size={16} className="text-amber-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/codeahsistemas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/10 hover:border-amber-400/40 transition-all"
                aria-label="Instagram de Codeah"
              >
                <IconBrandInstagram size={16} className="text-amber-400" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--dorado-codeah)]">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios principales
                </a>
              </li>
              <li>
                <a href="#como-trabajamos" className="hover:text-white transition-colors">
                  Cómo trabajamos
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Calculadora de proyectos
                </a>
              </li>
              <li>
                <a href="#casos" className="hover:text-white transition-colors">
                  Casos y soluciones
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Summary */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--dorado-codeah)]">
              Especialidades
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Integraciones de APIs & WhatsApp</li>
              <li>Desarrollo Web & E-commerce</li>
              <li>Sistemas de Facturación AFIP & Gestión</li>
              <li>Inteligencia Artificial Aplicada a PYMEs</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & scroll-up */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Codeah. Todos los derechos reservados.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[var(--dorado-codeah)] transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
