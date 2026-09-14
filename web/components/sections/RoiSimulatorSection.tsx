"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconCalculator,
  IconClock,
  IconCurrencyDollar,
  IconArrowRight,
  IconChartBar,
  IconCircleCheck,
} from "@tabler/icons-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn } from "@/components/ui/fade-in";

export function RoiSimulatorSection() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [teamSize, setTeamSize] = React.useState(3);
  const [hoursPerWeek, setHoursPerWeek] = React.useState(10);
  const [hourlyRate, setHourlyRate] = React.useState(15); // USD / ARS conversion factor

  // Calculations
  const weeklyHoursLost = teamSize * hoursPerWeek;
  const yearlyHoursLost = weeklyHoursLost * 48; // 48 working weeks
  const yearlyCostEstimate = yearlyHoursLost * hourlyRate * 1000; // estimated currency impact in ARS/USD equivalent
  const hoursSavedYearly = Math.round(yearlyHoursLost * 0.85); // 85% reduction in manual overhead

  return (
    <section className="py-20 md:py-28 bg-[var(--gris-azulado)]/70 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="gold">
            <IconCalculator size={16} className="mr-1 text-[var(--azul-codeah)]" />
            Simulador de Eficiencia Operativa
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
            ¿Cuánto tiempo y dinero pierde tu empresa en tareas manuales?
          </h2>
          <p className="text-base sm:text-lg text-[var(--gris-pizarra)]">
            Move los controles para calcular las horas de trabajo rutinario que podrías automatizar con la tecnología de Codeah.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl shadow-blue-950/5">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-8">
            {/* Slider 1: Team size */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-[var(--azul-codeah)] font-sora">
                <span>Personas operando en tu equipo:</span>
                <span className="px-3 py-1 bg-[var(--gris-azulado)] rounded-lg text-base font-extrabold text-[var(--azul-codeah)] border border-slate-200">
                  {teamSize} {teamSize === 1 ? "persona" : "personas"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[var(--azul-codeah)]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1 pers.</span>
                <span>10 pers.</span>
                <span>25+ pers.</span>
              </div>
            </div>

            {/* Slider 2: Hours lost per week */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-[var(--azul-codeah)] font-sora">
                <span>Horas semanales de carga manual por persona:</span>
                <span className="px-3 py-1 bg-amber-50 rounded-lg text-base font-extrabold text-[var(--dorado-codeah)] border border-amber-200">
                  {hoursPerWeek} hs / sem
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[var(--dorado-codeah)]"
              />
              <p className="text-xs text-[var(--gris-pizarra)]">
                (Facturación, respuestas repetitivas de WhatsApp, planillas de stock, tipeo de pedidos)
              </p>
            </div>

            {/* Quick Benefits list */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2.5 text-xs text-[var(--azul-codeah)] font-semibold">
                <IconCircleCheck size={18} className="text-[var(--verde-exito)]" />
                <span>Cero errores por tipeo de datos humano</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[var(--azul-codeah)] font-semibold">
                <IconCircleCheck size={18} className="text-[var(--verde-exito)]" />
                <span>Facturas y comprobantes emitidos en segundos</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[var(--azul-codeah)] font-semibold">
                <IconCircleCheck size={18} className="text-[var(--verde-exito)]" />
                <span>Tu equipo enfocado en vender y hacer crecer el negocio</span>
              </div>
            </div>
          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-6 bg-[var(--azul-profundo)] text-white p-6 md:p-8 rounded-2xl md:rounded-3xl space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <Badge variant="gold" className="text-[11px] uppercase tracking-wider">
                Resultado Estimado
              </Badge>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Horas recuperables para tu equipo al año:
                </p>
                <h3 className="text-4xl md:text-5xl font-sora font-extrabold text-[var(--dorado-codeah)] tracking-tight">
                  ~ {hoursSavedYearly.toLocaleString()} hs / año
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-700/80 space-y-2 text-xs md:text-sm text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span>Horas perdidas actualmente al año:</span>
                  <span className="font-bold text-white">{yearlyHoursLost.toLocaleString()} hs</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span>Eficiencia ganada con Codeah:</span>
                  <span className="font-bold text-emerald-400">hasta 85% de ahorro</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setContactModalOpen(true)}
                className="w-full justify-between group text-base font-bold shadow-lg shadow-amber-500/20"
              >
                <span>Quiero recuperar estas horas en mi negocio</span>
                <IconArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-[11px] text-center text-slate-400">
                Te asesoramos sin costo para diseñar la automatización exacta de tus procesos.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
        defaultService="Integraciones"
      />
    </section>
  );
}
