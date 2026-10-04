"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconArrowRight,
  IconPlayerPlay,
  IconWand,
  IconSearch,
  IconCircleCheck,
  IconDeviceMobile,
} from "@tabler/icons-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn } from "@/components/ui/fade-in";

export function HeroSectionV2() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<"overview" | "facturas" | "bot">("overview");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-[var(--gris-azulado)]/60 to-[var(--blanco-calido)]">
      {/* Background soft glowing blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column (Copy & CTA Stack) */}
          <FadeIn className="lg:col-span-6 space-y-6 text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-[var(--azul-codeah)]">
              <span className="flex h-2 w-2 rounded-full bg-[var(--verde-exito)] animate-ping" />
              <Badge variant="gold" className="text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold">
                NUEVO
              </Badge>
              <span>Sistemas, Web & Integraciones a Medida</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sora font-extrabold text-[var(--azul-codeah)] leading-[1.12] tracking-tight">
              Una Plataforma. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--azul-codeah)] via-[var(--azul-profundo)] to-[var(--dorado-codeah)]">
                Posibilidades Infinitas.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[var(--gris-pizarra)] max-w-xl font-normal leading-relaxed">
              Codeah conecta tus sistemas, facturación y ventas en una sola herramienta a medida para que te enfoques en hacer crecer tu negocio.
            </p>

            {/* Dual CTAs & Hand-Drawn Arrow Container */}
            <div className="relative pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setContactModalOpen(true)}
                className="rounded-full px-8 py-4 font-bold shadow-lg shadow-amber-500/20 group hover:scale-[1.02] transition-transform"
              >
                <span>Hablemos de tu proyecto</span>
                <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                asChild
                className="rounded-full px-6 py-4 font-semibold text-[var(--azul-codeah)] hover:bg-white/80 border border-slate-200/60 flex items-center justify-center gap-2"
              >
                <a href="#servicios">
                  <IconPlayerPlay size={20} className="text-[var(--dorado-codeah)]" />
                  <span>Ver soluciones en vivo</span>
                </a>
              </Button>

              {/* Hand-drawn decorative arrow SVG */}
              <div className="hidden lg:block absolute -right-24 top-0 pointer-events-none opacity-70">
                <svg width="90" height="60" viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 15 C 30 5, 60 10, 75 35 M 75 35 L 65 30 M 75 35 L 72 23" stroke="#D9A441" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

          </FadeIn>

          {/* Right Column (Hero 3D Perspective UI Mockup) */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-6 relative">
            <div className="relative mx-auto w-full max-w-xl perspective-1000">

              {/* Main 3D Panel Container */}
              <div className="relative rounded-3xl border border-slate-200/80 bg-white p-4 md:p-6 shadow-2xl shadow-blue-950/15 transform lg:rotate-y-[-6deg] lg:rotate-x-[4deg] transition-transform duration-500 hover:rotate-0">

                {/* Panel Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>

                  {/* Search Bar Input Mockup */}
                  <div className="flex-1 max-w-xs mx-4 relative hidden sm:block">
                    <IconSearch size={14} className="absolute left-3 top-2.5 text-slate-400" />
                    <input
                      disabled
                      placeholder="Buscar ventas, facturas o clientes..."
                      className="w-full bg-[var(--gris-azulado)] text-[11px] rounded-lg pl-8 pr-3 py-1.5 border border-slate-200/60 text-slate-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[var(--verde-exito)] text-[10px] font-bold border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      AFIP ONLINE
                    </span>
                  </div>
                </div>

                {/* Top 3 Quick Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-[var(--gris-azulado)] p-3 rounded-xl border border-slate-200/60">
                    <p className="text-[10px] font-semibold text-slate-500">Ventas del Mes</p>
                    <p className="text-base font-sora font-extrabold text-[var(--azul-codeah)]">$ 4.85M</p>
                    <span className="text-[9px] font-bold text-emerald-600">+28% este mes</span>
                  </div>

                  <div className="bg-[var(--gris-azulado)] p-3 rounded-xl border border-slate-200/60">
                    <p className="text-[10px] font-semibold text-slate-500">Facturas AFIP</p>
                    <p className="text-base font-sora font-extrabold text-[var(--azul-codeah)]">1,240</p>
                    <span className="text-[9px] font-bold text-emerald-600">100% Emitidas</span>
                  </div>

                  <div className="bg-[var(--gris-azulado)] p-3 rounded-xl border border-slate-200/60">
                    <p className="text-[10px] font-semibold text-slate-500">WhatsApp Bot</p>
                    <p className="text-base font-sora font-extrabold text-[var(--azul-codeah)]">99.9%</p>
                    <span className="text-[9px] font-bold text-[var(--dorado-codeah)]">Respuesta 24/7</span>
                  </div>
                </div>

                {/* Center Content: Graph + AI Assistant Card */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Sales Graph & Activity Feed */}
                  <div className="sm:col-span-8 bg-slate-900 text-white p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-200 font-sora">Flujo Operativo en Tiempo Real</p>
                      <span className="text-[10px] font-mono text-amber-400">Actualizado hace 2m</span>
                    </div>

                    {/* Chart Bars */}
                    <div className="h-24 flex items-end gap-2 pt-2 border-b border-slate-800">
                      <div className="flex-1 bg-blue-500/40 rounded-t h-[40%]" />
                      <div className="flex-1 bg-blue-500/60 rounded-t h-[60%]" />
                      <div className="flex-1 bg-blue-500/80 rounded-t h-[75%]" />
                      <div className="flex-1 bg-[var(--dorado-codeah)] rounded-t h-[95%]" />
                      <div className="flex-1 bg-emerald-400 rounded-t h-[85%]" />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <IconCircleCheck size={14} className="text-emerald-400" />
                        <span>Sincronización WhatsApp</span>
                      </div>
                      <span className="font-mono text-emerald-400">ACTIVO</span>
                    </div>
                  </div>

                  {/* AI Assistant Side Card */}
                  <div className="sm:col-span-4 bg-gradient-to-br from-amber-500 to-[var(--dorado-codeah)] text-[var(--azul-profundo)] p-4 rounded-2xl flex flex-col justify-between shadow-md">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <IconWand size={18} />
                        <span className="text-[9px] font-extrabold uppercase tracking-wider bg-white/30 px-1.5 py-0.5 rounded">
                          IA CODEAH
                        </span>
                      </div>
                      <p className="text-xs font-sora font-extrabold leading-tight">
                        Asistente Virtual Activo
                      </p>
                      <p className="text-[11px] leading-tight font-medium text-amber-950">
                        Atendiendo consultas de catálogo y stock por WhatsApp.
                      </p>
                    </div>
                    <div className="pt-2 text-[10px] font-bold text-[var(--azul-profundo)] underline cursor-pointer">
                      Ver logs de automatización →
                    </div>
                  </div>
                </div>

                {/* Floating Mobile Smartphone App Glass Overlay */}
                <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-3 w-52 z-30 animate-float-slow">
                  <div className="p-2.5 bg-[var(--azul-codeah)] text-white rounded-xl">
                    <IconDeviceMobile size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--azul-codeah)] uppercase">Gestión Móvil</p>
                    <p className="text-xs font-extrabold text-[var(--azul-profundo)]">Comprobante A-1294</p>
                    <span className="text-[9px] font-bold text-emerald-600">Comprobante Enviado ✓</span>
                  </div>
                </div>

              </div>
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
