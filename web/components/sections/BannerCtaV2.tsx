"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconArrowRight, IconWand, IconShieldCheck } from "@tabler/icons-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn } from "@/components/ui/fade-in";

export function BannerCtaV2() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  return (
    <section id="contacto" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative rounded-3xl md:rounded-[2.5rem] bg-gradient-to-r from-[var(--azul-profundo)] via-[var(--azul-codeah)] to-[#1E3A75] text-white p-8 md:p-14 overflow-hidden shadow-2xl shadow-blue-950/20 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Background 3D Glow Orbs & Hand Drawn SVG Arrow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[var(--dorado-codeah)]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

            {/* Left Content */}
            <div className="space-y-4 text-center lg:text-left max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-amber-400/20">
                <IconWand size={14} />
                <span>COMENZÁ HOY SIN COMPROMISO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-white leading-tight tracking-tight">
                ¿Listo para potenciar la tecnología de tu empresa?
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Contanos tu proyecto o proceso a mejorar. Te responderemos personalmente con una propuesta clara, presupuesto cerrado y tiempos firmes.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <IconShieldCheck size={16} className="text-emerald-400" />
                  <span>Sin costo inicial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconShieldCheck size={16} className="text-[var(--dorado-codeah)]" />
                  <span>Código 100% de tu propiedad</span>
                </div>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0 relative z-10 w-full lg:w-auto">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setContactModalOpen(true)}
                className="w-full lg:w-auto rounded-full px-10 py-5 text-base font-bold shadow-xl shadow-amber-500/25 group hover:scale-[1.03] transition-transform"
              >
                <span>Solicitar propuesta formal</span>
                <IconArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

          </div>
        </FadeIn>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </section>
  );
}
