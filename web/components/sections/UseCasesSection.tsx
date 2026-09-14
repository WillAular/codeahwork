"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ShoppingCart,
  Receipt,
  MessageSquare,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in";

export function UseCasesSection() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  const cases = [
    {
      icon: Receipt,
      category: "Facturación & AFIP",
      title: "Agilización del proceso de facturación masiva",
      challenge: "Tardaban más de 3 horas diarias en emitir comprobantes a mano para cada cliente.",
      solution: "Sistema a medida conectado al WebService de AFIP que genera facturas con 1 click.",
      impact: "-90% tiempo de carga manual",
    },
    {
      icon: ShoppingCart,
      category: "Comercio & E-commerce",
      title: "Tienda online sincronizada con stock físico",
      challenge: "Discrepancias frecuentes entre el stock del local y las ventas por la web.",
      solution: "Desarrollo de e-commerce rápido integrado en tiempo real con la base de datos local.",
      impact: "Cero ventas sin stock disponible",
    },
    {
      icon: MessageSquare,
      category: "Atención al Cliente",
      title: "Automatización de consultas recurrentes por WhatsApp",
      challenge: "El equipo comercial perdía horas respondiendo horarios, presupuestos y estados de envío.",
      solution: "Asistente inteligente con WhatsApp API que resuelve dudas comunes y deriva oportunidades calificados.",
      impact: "+35% en conversión de leads",
    },
    {
      icon: Users,
      category: "Portal de Clientes",
      title: "Autogestión de pedidos y descarga de comprobantes",
      challenge: "Los clientes llamaban constantemente para solicitar copias de facturas o estado de cuenta.",
      solution: "Portal seguro donde cada cliente ingresa, descarga sus comprobantes y ve sus saldos 24/7.",
      impact: "Menor carga en administración",
    },
  ];

  return (
    <section id="casos" className="py-20 md:py-28 bg-[var(--gris-azulado)]/40 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="gold">Casos & Soluciones</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
            Problemas habituales que resolvemos.
          </h2>
          <p className="text-base sm:text-lg text-[var(--gris-pizarra)]">
            Ejemplos concretos de optimización operativa en PYMEs y negocios en crecimiento.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <FadeInStaggerItem key={idx}>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--gris-azulado)] text-[var(--azul-codeah)] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-[var(--azul-codeah)] uppercase tracking-wider">
                          {useCase.category}
                        </span>
                      </div>
                      <Badge variant="success" className="text-[11px]">
                        {useCase.impact}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-sora font-bold text-[var(--azul-codeah)]">
                      {useCase.title}
                    </h3>

                    <div className="space-y-2 text-xs sm:text-sm text-[var(--gris-pizarra)]">
                      <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                        <strong className="text-rose-900 block font-semibold mb-0.5">El desafío:</strong>
                        {useCase.challenge}
                      </div>
                      <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                        <strong className="text-emerald-900 block font-semibold mb-0.5">La solución Codeah:</strong>
                        {useCase.solution}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => setContactModalOpen(true)}
                      className="text-xs font-bold text-[var(--azul-codeah)] hover:text-[var(--dorado-codeah)] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Quiero una solución similar para mi empresa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </section>
  );
}
