"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageSquareCode, ShieldCheck, Sparkles } from "lucide-react";
import { ContactModal } from "@/components/sections/ContactModal";

export function FinalCTASection() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  return (
    <section id="contacto" className="py-20 md:py-28 bg-[var(--azul-profundo)] text-white relative overflow-hidden">
      {/* Golden accent graphic glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[var(--dorado-codeah)]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-amber-400/20">
          <Sparkles className="w-4 h-4" /> Comenza a optimizar hoy
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sora font-extrabold text-white leading-tight tracking-tight max-w-4xl mx-auto">
          ¿Tenés una idea o un proceso que <br className="hidden sm:inline" />
          <span className="text-[var(--dorado-codeah)]">hoy te hace perder tiempo?</span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          No necesitás adaptarte a un sistema genérico: construimos la solución exacta para tu operación.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="gold"
            size="lg"
            onClick={() => setContactModalOpen(true)}
            className="w-full sm:w-auto px-10 shadow-xl shadow-amber-500/20 group"
          >
            <span>Contanos tu proyecto</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Asesoramiento sin compromiso</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquareCode className="w-4 h-4 text-[var(--dorado-codeah)]" />
            <span>Respuesta personalizada</span>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </section>
  );
}
