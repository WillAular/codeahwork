"use client";

import * as React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { IconShieldCheck, IconBolt, IconWorld, IconCpu, IconSettings } from "@tabler/icons-react";

export function LogoCloudSection() {
  const integrations = [
    { name: "AFIP WebServices", tag: "Facturación A, B, C" },
    { name: "WhatsApp Business API", tag: "Bot & Notificaciones" },
    { name: "MercadoPago / Pasarelas", tag: "Cobros en Línea" },
    { name: "WooCommerce / Shopify", tag: "Sincronización E-commerce" },
    { name: "Google Cloud / AWS", tag: "Infraestructura 99.9%" },
  ];

  return (
    <section className="py-10 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left shrink-0 space-y-0.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--dorado-codeah)]">
              Ecosistema Conectado
            </p>
            <p className="text-sm font-sora font-bold text-[var(--azul-codeah)]">
              Integración nativa con tus plataformas clave:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-[var(--gris-azulado)] rounded-xl border border-slate-200/80 text-xs font-semibold text-[var(--azul-codeah)] flex items-center gap-2 hover:border-[var(--azul-codeah)] transition-colors shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--verde-exito)]" />
                <span>{item.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({item.tag})</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
