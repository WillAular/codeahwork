"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconHelpCircle, IconArrowRight } from "@tabler/icons-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn } from "@/components/ui/fade-in";

export function FaqSection() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  const faqs = [
    {
      question: "¿El sistema y el código fuente pasan a ser 100% de mi propiedad?",
      answer:
        "Sí, totalmente. Al finalizar el proyecto y completar las entregas, te transferimos la propiedad intelectual, el código fuente limpio en tu propio repositorio y las bases de datos. No cobramos licencias ocultas por uso.",
    },
    {
      question: "¿Cómo es la modalidad de pago y facturación?",
      answer:
        "Trabajamos con presupuestos cerrados y etapas transparentes (por ejemplo: anticipo inicial al aprobar el diseño, pago intermedio con avances funcionales y saldo final al poner en marcha). Emitimos facturas A o B según requiera tu empresa.",
    },
    {
      question: "¿Pueden integrar mi software actual aunque sea un sistema antiguo?",
      answer:
        "En el 95% de los casos sí. Evaluamos si tu software dispone de APIs, bases de datos o exportaciones estructuradas. Si no cuenta con API nativa, diseñamos conectores intermediarios para sincronizar los datos de forma segura.",
    },
    {
      question: "¿Cuánto tiempo demora habitualmente un desarrollo de Codeah?",
      answer:
        "Depende de la complejidad: un sitio web profesional o e-commerce suele tomar de 10 a 20 días hábiles. Una integración de facturación AFIP o sistema a medida, entre 15 y 35 días. Antes de iniciar, acordamos un cronograma firme.",
    },
    {
      question: "¿Qué ocurre si mi negocio crece y necesitamos agregar más funciones?",
      answer:
        "Toda nuestra arquitectura se construye de manera modular con Next.js y TypeScript. Esto permite incorporar nuevos módulos, integraciones o paneles sin necesidad de rehacer el sistema desde cero.",
    },
    {
      question: "¿Brindan soporte y mantenimiento después de publicar el proyecto?",
      answer:
        "Sí. Todos nuestros desarrollos cuentan con 30 días de garantía post-lanzamiento sin costo. Además, ofrecemos planes opcionales de mantenimiento preventivo, monitoreo y horas de desarrollo para seguir evolucionando la herramienta.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[var(--gris-azulado)]/50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center space-y-4 mb-14">
          <Badge variant="gold">
            <IconHelpCircle size={16} className="mr-1 text-[var(--azul-codeah)]" />
            Preguntas Frecuentes
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
            Respuestas claras a tus dudas.
          </h2>
          <p className="text-base sm:text-lg text-[var(--gris-pizarra)]">
            Todo lo que necesitas saber sobre nuestra forma de trabajar, tiempos y entregas.
          </p>
        </FadeIn>

        {/* Accordion List */}
        <FadeIn delay={0.2} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-lg shadow-blue-950/5">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-base sm:text-lg font-sora font-bold text-[var(--azul-codeah)] hover:text-[var(--dorado-codeah)] text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-[var(--gris-pizarra)] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-10 text-center space-y-3">
          <p className="text-sm text-[var(--gris-pizarra)]">
            ¿Tenés alguna otra consulta técnica o comercial para tu caso particular?
          </p>
          <button
            onClick={() => setContactModalOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--azul-codeah)] hover:text-[var(--dorado-codeah)] transition-colors cursor-pointer"
          >
            <span>Hacer una pregunta específica</span>
            <IconArrowRight size={16} />
          </button>
        </FadeIn>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </section>
  );
}
