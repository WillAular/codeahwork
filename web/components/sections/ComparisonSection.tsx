"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconCircleCheck, IconCircleX, IconArrowRight, IconShieldCheck } from "@tabler/icons-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn } from "@/components/ui/fade-in";

export function ComparisonSection() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  const criteria = [
    {
      feature: "Propiedad del código y datos",
      codeah: "100% de tu propiedad (código limpio, sin ataduras)",
      saas: "Alquiler continuo (si dejás de pagar, perdés el sistema)",
      agency: "Generalmente licencias cerradas o sobrecostos extra",
    },
    {
      feature: "Adaptación a tus procesos de negocio",
      codeah: "Absoluta: el software se construye para tu operación",
      saas: "Rigidez total: tu empresa debe adaptarse al software",
      agency: "Lenta y dependiente de proyectos de meses",
    },
    {
      feature: "Integraciones (AFIP, WhatsApp, Pasarelas)",
      codeah: "Conexión fluida de APIs nativas sin fricción",
      saas: "Limitadas a plugins de terceros con costo extra",
      agency: "Requiere cotizaciones costosas por cada módulo",
    },
    {
      feature: "Soporte técnico y comunicación",
      codeah: "Directo con los ingenieros que crearon tu sistema",
      saas: "Mesa de ayuda impersonal con tickets lentos",
      agency: "Soporte discontinuo tras la entrega final",
    },
    {
      feature: "Transparencia de inversión",
      codeah: "Presupuesto cerrado por etapas claras y sin sorpresas",
      saas: "Aumentos periódicos por usuario o volumen",
      agency: "Costos variables por horas adicionales no estimadas",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="gold">
            <IconShieldCheck size={16} className="mr-1 text-[var(--azul-codeah)]" />
            Por qué elegir Codeah
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
            Transparencia técnica y comercial desde el primer día.
          </h2>
          <p className="text-base sm:text-lg text-[var(--gris-pizarra)]">
            Compará nuestro enfoque frente a las alternativas tradicionales del mercado.
          </p>
        </FadeIn>

        {/* Comparison Table */}
        <FadeIn delay={0.2} className="overflow-x-auto rounded-3xl border border-slate-200 shadow-lg shadow-blue-950/5">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[var(--gris-azulado)] border-b border-slate-200">
                <th className="p-5 font-sora font-bold text-sm text-[var(--azul-codeah)] w-1/4">
                  Criterio de Evaluación
                </th>
                <th className="p-5 font-sora font-extrabold text-base text-[var(--azul-codeah)] bg-amber-50/80 border-x border-amber-200/80 w-1/3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[var(--azul-codeah)] font-bold text-lg">Solución Codeah</span>
                    <Badge variant="gold" className="text-[10px]">RECOMENDADO</Badge>
                  </div>
                </th>
                <th className="p-5 font-sora font-semibold text-xs text-slate-500 w-1/4 text-center">
                  SaaS / Plataformas Genéricas
                </th>
                <th className="p-5 font-sora font-semibold text-xs text-slate-500 w-1/4 text-center">
                  Agencias Tradicionales
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {criteria.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-sora font-bold text-[var(--azul-codeah)] bg-white">
                    {row.feature}
                  </td>
                  <td className="p-5 font-medium text-[var(--azul-codeah)] bg-amber-50/30 border-x border-amber-200/50 font-semibold">
                    <div className="flex items-start gap-2">
                      <IconCircleCheck size={18} className="text-[var(--verde-exito)] shrink-0 mt-0.5" />
                      <span>{row.codeah}</span>
                    </div>
                  </td>
                  <td className="p-5 text-slate-500 text-center">
                    <div className="flex items-start justify-center gap-1.5">
                      <IconCircleX size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <span>{row.saas}</span>
                    </div>
                  </td>
                  <td className="p-5 text-slate-500 text-center">
                    <div className="flex items-start justify-center gap-1.5">
                      <IconCircleX size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <span>{row.agency}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-10 text-center">
          <Button
            variant="gold"
            size="lg"
            onClick={() => setContactModalOpen(true)}
            className="group font-bold"
          >
            <span>Conversar sobre una propuesta a medida</span>
            <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </FadeIn>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </section>
  );
}
