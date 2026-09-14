"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Layout,
  Code2,
  Rocket,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in";

export function WorkflowSection() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Entendemos tu operación",
      shortDesc: "Diagnóstico inicial y mapa de procesos.",
      fullDesc:
        "Analizamos cómo trabaja hoy tu equipo, qué herramientas utilizan y dónde están los cuellos de botella. Definimos los objetivos de negocio antes de escribir una sola línea de código.",
      deliverables: [
        "Reunión de relevamiento enfocada",
        "Mapa claro del flujo de trabajo",
        "Propuesta técnica y comercial detallada",
      ],
    },
    {
      number: "02",
      icon: Layout,
      title: "Diseñamos la solución",
      shortDesc: "Arquitectura, prototipos e interfaces.",
      fullDesc:
        "Diseñamos las pantallas, el flujo de usuario y la estructura de datos. Priorizamos una interfaz clara, intuitiva y cómoda para el uso diario sin rodeos innecesarios.",
      deliverables: [
        "Prototipo interactivo navegable",
        "Definición de integraciones API",
        "Validación previa con tu equipo",
      ],
    },
    {
      number: "03",
      icon: Code2,
      title: "Desarrollamos e integramos",
      shortDesc: "Construcción rápida con código limpio.",
      fullDesc:
        "Programamos con estándares modernos (Next.js, TypeScript, APIs seguras). Realizamos pruebas constantes y conectamos tus canales (WhatsApp, AFIP, Pasarelas de Pago).",
      deliverables: [
        "Desarrollo iterativo con muestras periódicas",
        "Conexión de APIs y base de datos",
        "Control de calidad y velocidad",
      ],
    },
    {
      number: "04",
      icon: Rocket,
      title: "Acompañamos la puesta en marcha",
      shortDesc: "Despliegue, capacitación y soporte.",
      fullDesc:
        "Publicamos el sistema, capacitamos a tu personal y monitoreamos los primeros días de operación para asegurar una transición fluida y sin interrupciones.",
      deliverables: [
        "Puesta en producción segura",
        "Capacitación práctica del equipo",
        "Soporte post-lanzamiento cercano",
      ],
    },
  ];

  return (
    <section id="como-trabajamos" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="gold">Metodología Clara</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
            Cómo trabajamos paso a paso.
          </h2>
          <p className="text-base sm:text-lg text-[var(--gris-pizarra)]">
            Un proceso ordenado y transparente desde el primer contacto hasta el sistema funcionando en tu día a día.
          </p>
        </FadeIn>

        {/* Desktop Process Step Navigator */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <FadeInStaggerItem key={idx}>
                <button
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? "bg-[var(--azul-codeah)] text-white border-[var(--azul-codeah)] shadow-xl shadow-blue-950/10 scale-[1.02]"
                      : "bg-[var(--blanco-calido)] text-[var(--azul-codeah)] border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-2xl font-sora font-extrabold font-mono ${
                        isActive ? "text-[var(--dorado-codeah)]" : "text-slate-400"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "bg-[var(--gris-azulado)] text-[var(--azul-codeah)]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-sora font-bold text-base md:text-lg mb-1">
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs ${
                      isActive ? "text-slate-200" : "text-[var(--gris-pizarra)]"
                    }`}
                  >
                    {step.shortDesc}
                  </p>
                </button>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>

        {/* Step Detail Card Display */}
        <FadeIn delay={0.2} className="rounded-3xl border border-slate-200 bg-[var(--gris-azulado)]/60 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[var(--azul-codeah)] text-[var(--dorado-codeah)] text-xs font-mono font-bold rounded-lg">
                  PASO {steps[activeStep].number} DE 04
                </span>
                <h3 className="text-2xl sm:text-3xl font-sora font-bold text-[var(--azul-codeah)]">
                  {steps[activeStep].title}
                </h3>
              </div>

              <p className="text-base md:text-lg text-[var(--gris-pizarra)] leading-relaxed">
                {steps[activeStep].fullDesc}
              </p>

              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
                  Entregables clave de esta etapa:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {steps[activeStep].deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 text-sm text-[var(--azul-codeah)] font-medium bg-white p-2.5 rounded-xl border border-slate-200"
                    >
                      <CheckCircle className="w-4 h-4 text-[var(--verde-exito)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6 text-center lg:text-left">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--dorado-codeah)] uppercase">
                  Acompañamiento transparente
                </p>
                <h4 className="text-xl font-sora font-bold text-[var(--azul-codeah)]">
                  ¿Tenés dudas sobre cómo iniciar?
                </h4>
                <p className="text-xs text-[var(--gris-pizarra)]">
                  Agendamos una breve llamada sin costo para orientarte sobre cuál es la mejor alternativa tecnológica para tu caso.
                </p>
              </div>
              <Button
                variant="gold"
                size="default"
                onClick={() => setContactModalOpen(true)}
                className="w-full justify-center group"
              >
                <span>Conversar sobre mi proyecto</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
