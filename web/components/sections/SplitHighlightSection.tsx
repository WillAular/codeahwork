"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconCircleCheck,
  IconArrowRight,
  IconDeviceMobile,
  IconReceipt,
  IconMessage,
  IconShieldCheck,
  IconBolt,
} from "@tabler/icons-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn } from "@/components/ui/fade-in";

export function SplitHighlightSection() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Human Context + Floating Glass Popovers) */}
          <FadeIn className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Photo Card Container */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-gradient-to-tr from-slate-900 to-[var(--azul-codeah)] p-2">
                <div className="relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden">
                  {/* Real entrepreneur workspace visual background styling */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--azul-profundo)] via-[var(--azul-codeah)]/80 to-transparent z-10 opacity-90" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-20 text-white space-y-2">
                    <Badge variant="gold" className="w-max text-[10px] uppercase">
                      OPERACIÓN EN TIEMPO REAL
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl font-sora font-extrabold text-white">
                      Tu empresa en control, <br />
                      desde cualquier lugar.
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Centralizá comprobantes, stock y mensajería sin depender de planillas aisladas.
                    </p>
                  </div>
                </div>

                {/* Floating Glass Popover 1: Factura AFIP */}
                <div className="absolute top-6 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-float-slow z-30 max-w-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[var(--verde-exito)] flex items-center justify-center shrink-0">
                    <IconReceipt size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Facturación AFIP</p>
                    <p className="text-xs font-sora font-extrabold text-[var(--azul-codeah)]">Factura A-0004-1294</p>
                    <span className="text-[9px] font-bold text-[var(--verde-exito)]">Emitida ✓</span>
                  </div>
                </div>

                {/* Floating Glass Popover 2: WhatsApp Auto-reply */}
                <div className="absolute bottom-16 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-float-slow z-30 max-w-xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[var(--dorado-codeah)] flex items-center justify-center shrink-0">
                    <IconMessage size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp Bot</p>
                    <p className="text-xs font-sora font-extrabold text-[var(--azul-codeah)]">Respuesta Enviada</p>
                    <span className="text-[9px] font-bold text-amber-600">Catálogo enviado 24/7</span>
                  </div>
                </div>

              </div>

            </div>
          </FadeIn>

          {/* Right Column (Checklist + Smartphone Mockup) */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-6 space-y-6 text-left">
            <Badge variant="gold">GESTIÓN CENTRALIZADA</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
              Planificá, controlá y entregá proyectos a tiempo.
            </h2>
            <p className="text-base sm:text-lg text-[var(--gris-pizarra)] leading-relaxed">
              Diseñamos sistemas que reducen el trabajo administrativo para que puedas enfocarte en tomar decisiones estratégicas.
            </p>

            {/* Checklist with tildes */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <IconCircleCheck size={22} className="text-[var(--verde-exito)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sora font-bold text-[var(--azul-codeah)]">Facturación en 1-click</p>
                  <p className="text-xs text-[var(--gris-pizarra)]">Emisión inmediata de comprobantes AFIP sin ingresar al sitio web fiscal.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IconCircleCheck size={22} className="text-[var(--verde-exito)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sora font-bold text-[var(--azul-codeah)]">Avisos automáticos por WhatsApp</p>
                  <p className="text-xs text-[var(--gris-pizarra)]">Envío directo de facturas y confirmaciones de pedidos al celular del cliente.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IconCircleCheck size={22} className="text-[var(--verde-exito)] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sora font-bold text-[var(--azul-codeah)]">Reportes financieros transparentes</p>
                  <p className="text-xs text-[var(--gris-pizarra)]">Visualizá ingresos, cuentas corrientes y cajas en un solo lugar.</p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setContactModalOpen(true)}
                className="rounded-full px-8 font-bold shadow-md group"
              >
                <span>Conocé cómo funciona</span>
                <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </FadeIn>

        </div>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </section>
  );
}
