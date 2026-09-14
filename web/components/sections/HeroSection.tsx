"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers,
  Receipt,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Bot
} from "lucide-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn } from "@/components/ui/fade-in";

export function HeroSection() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [selectedMockupTab, setSelectedMockupTab] = React.useState<"dashboard" | "factura" | "integracion">("dashboard");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-[var(--gris-azulado)]/50 to-[var(--blanco-calido)]">
      {/* Background subtle nodes/circuit grid detail */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl" />
        <svg
          className="w-full h-full text-slate-200/50"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Main Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2">
              <Badge variant="gold" className="px-3 py-1.5 text-xs sm:text-sm">

                Sistemas, Web & Integraciones a Medida
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sora font-extrabold text-[var(--azul-codeah)] leading-[1.12] tracking-tight">
              Tecnología que hace <br className="hidden sm:inline" />
              <span className="relative inline-block text-[var(--azul-profundo)]">
                crecer tu negocio.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--gris-pizarra)] max-w-2xl font-normal leading-relaxed">
              Creamos sitios web, sistemas de facturación e integraciones para que vendas, gestiones y escales con menos fricción.
            </p>

            {/* CTAs dual */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setContactModalOpen(true)}
                className="group shadow-lg shadow-amber-500/25"
              >
                <span>Hablemos de tu proyecto</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="border border-slate-300/80 hover:border-[var(--azul-codeah)]"
              >
                <a href="#servicios">Ver soluciones</a>
              </Button>
            </div>

            {/* Quick Benefits Pills */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/80">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--verde-exito)] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[var(--azul-codeah)]">
                  100% a medida
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--verde-exito)] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[var(--azul-codeah)]">
                  Integraciones fluidas
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--verde-exito)] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[var(--azul-codeah)]">
                  Soporte cercano
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Multi-Device System Mockup */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-lg animate-float-slow">
              {/* Decorative back glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--azul-codeah)] to-[var(--dorado-codeah)] rounded-3xl blur-xl opacity-20" />

              {/* Laptop & System Card Container */}
              <div className="relative rounded-2xl md:rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-2xl shadow-blue-950/10 space-y-4">

                {/* Mockup Header Navigation Tabs */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs font-semibold text-slate-400 font-mono">
                      codeah-suite-v2.app
                    </span>
                  </div>
                  <Badge variant="gold" className="text-[10px] px-2 py-0.5">
                    EN VIVO
                  </Badge>
                </div>

                {/* Mockup Tab Selector */}
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-[var(--azul-codeah)]">
                  <button
                    onClick={() => setSelectedMockupTab("dashboard")}
                    className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${selectedMockupTab === "dashboard"
                      ? "bg-white shadow-xs text-[var(--azul-codeah)]"
                      : "text-slate-500 hover:text-[var(--azul-codeah)]"
                      }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" /> Dashboard
                  </button>
                  <button
                    onClick={() => setSelectedMockupTab("factura")}
                    className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${selectedMockupTab === "factura"
                      ? "bg-white shadow-xs text-[var(--azul-codeah)]"
                      : "text-slate-500 hover:text-[var(--azul-codeah)]"
                      }`}
                  >
                    <Receipt className="w-3.5 h-3.5" /> Facturas
                  </button>
                  <button
                    onClick={() => setSelectedMockupTab("integracion")}
                    className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${selectedMockupTab === "integracion"
                      ? "bg-white shadow-xs text-[var(--azul-codeah)]"
                      : "text-slate-500 hover:text-[var(--azul-codeah)]"
                      }`}
                  >
                    <Zap className="w-3.5 h-3.5" /> Conexión
                  </button>
                </div>

                {/* Mockup Display Content */}
                <div className="bg-[var(--gris-azulado)] rounded-xl p-4 min-h-[230px] flex flex-col justify-between border border-slate-200/60">
                  {selectedMockupTab === "dashboard" && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-slate-500">Ventas del mes</p>
                          <h4 className="text-2xl font-sora font-extrabold text-[var(--azul-codeah)]">
                            $ 4.850.000 <span className="text-xs font-semibold text-emerald-600">+28%</span>
                          </h4>
                        </div>
                        <span className="p-2 bg-blue-100 text-[var(--azul-codeah)] rounded-lg">
                          <TrendingUp className="w-5 h-5" />
                        </span>
                      </div>

                      {/* Mini Bar Chart Graphic */}
                      <div className="h-20 flex items-end gap-2 pt-2 border-t border-slate-200">
                        <div className="flex-1 bg-blue-200 rounded-t h-[40%]" />
                        <div className="flex-1 bg-blue-300 rounded-t h-[60%]" />
                        <div className="flex-1 bg-blue-400 rounded-t h-[45%]" />
                        <div className="flex-1 bg-[var(--azul-codeah)] rounded-t h-[85%]" />
                        <div className="flex-1 bg-[var(--dorado-codeah)] rounded-t h-[100%]" />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span>
                      </div>
                    </div>
                  )}

                  {selectedMockupTab === "factura" && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <div>
                          <p className="text-xs font-semibold text-[var(--azul-codeah)]">Factura Electrónica A-0004-1294</p>
                          <p className="text-[10px] text-slate-400">AFIP WebService Conectado</p>
                        </div>
                        <Badge variant="success" className="text-[10px]">
                          EMITIDA
                        </Badge>
                      </div>
                      <div className="space-y-1.5 text-xs text-[var(--gris-pizarra)]">
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>Desarrollo E-commerce</span>
                          <span className="font-semibold text-[var(--azul-codeah)]">$ 350.000</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span>Módulo Facturación AFIP</span>
                          <span className="font-semibold text-[var(--azul-codeah)]">$ 120.000</span>
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-[var(--azul-codeah)]">
                        <span>Total comprobante:</span>
                        <span className="text-sm text-[var(--azul-profundo)]">$ 470.000</span>
                      </div>
                    </div>
                  )}

                  {selectedMockupTab === "integracion" && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <p className="text-xs font-semibold text-[var(--azul-codeah)]">Flujo de Integración Activo</p>
                      <div className="space-y-2">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-medium text-[var(--azul-codeah)]">WhatsApp API & Contacto</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono font-medium">Sincronizado</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-medium text-[var(--azul-codeah)]">Catálogo & Stock en tiempo real</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono font-medium">Sincronizado</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Smartphone Mockup Overlay */}
                <div className="absolute -bottom-6 -right-4 w-44 bg-[var(--azul-profundo)] text-white p-3 rounded-2xl shadow-2xl border-2 border-white flex items-center gap-3">
                  <div className="p-2 bg-[var(--dorado-codeah)] text-[var(--azul-profundo)] rounded-xl shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-200 font-semibold uppercase">Gestión Mobile</p>
                    <p className="text-xs font-bold leading-tight">Controlá tu operación 24/7</p>
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
