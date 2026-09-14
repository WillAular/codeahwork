"use client";

import * as React from "react";
import { Sliders, Link2, TrendingUp, ShieldCheck } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in";

export function TrustPillarsSection() {
  const pillars = [
    {
      icon: Sliders,
      title: "A medida de tu negocio",
      description:
        "No adaptamos tu empresa a una plantilla inflexible. Diseñamos la lógica digital para que potencie tus procesos actuales.",
      badge: "Sin rigidez",
    },
    {
      icon: Link2,
      title: "Integradas a tus herramientas",
      description:
        "Conectamos tus sistemas actuales (WhatsApp, AFIP, e-commerce, ERP, bancos) para eliminar el tipeo manual repetitivo.",
      badge: "Cero fricción",
    },
    {
      icon: TrendingUp,
      title: "Preparadas para crecer",
      description:
        "Arquitectura limpia y escalable. Tu plataforma responderá con rapidez cuando aumenten las ventas o el volumen de usuarios.",
      badge: "Escalabilidad",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--gris-azulado)] border border-slate-200 text-xs font-bold text-[var(--azul-codeah)] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[var(--dorado-codeah)]" />
            Filosofía Codeah
          </div>
          <h2 className="text-3xl sm:text-4xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
            Soluciones pensadas para tu operación, <br className="hidden sm:inline" />
            <span className="text-[var(--gris-pizarra)] font-normal">no software genérico.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--gris-pizarra)]">
            Combinamos solidez técnica con entendimiento del día a día del negocio.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <FadeInStaggerItem
                key={idx}
                className="group relative rounded-2xl border border-slate-200 bg-[var(--blanco-calido)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--azul-codeah)]/40 hover:shadow-xl hover:shadow-blue-950/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--gris-azulado)] text-[var(--azul-codeah)] flex items-center justify-center group-hover:bg-[var(--azul-codeah)] group-hover:text-white transition-colors duration-300 shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-[var(--dorado-codeah)] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-sora font-bold text-[var(--azul-codeah)] pt-2">
                    {pillar.title}
                  </h3>

                  <p className="text-sm md:text-base text-[var(--gris-pizarra)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[var(--azul-codeah)]">
                  <span className="group-hover:text-[var(--dorado-codeah)] transition-colors">
                    Desarrollo focalizado en resultados
                  </span>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
