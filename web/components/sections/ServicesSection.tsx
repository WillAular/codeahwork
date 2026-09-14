"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconBolt,
  IconWorld,
  IconReceipt,
  IconCpu,
  IconSettings,
  IconArrowRight,
  IconCircleCheck,
} from "@tabler/icons-react";
import { ContactModal } from "@/components/sections/ContactModal";

export function ServicesSection() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("General");

  const services = [
    {
      id: "Integraciones",
      icon: IconBolt,
      badge: "Prioritario",
      title: "Integraciones y automatizaciones",
      subtitle: "Conectamos tus sistemas para que trabajen juntos.",
      description:
        "Vinculamos e-commerce, WhatsApp API, CRMs, pasarelas de pago y sistemas de facturación. Evitamos la duplicación manual de datos y aceleramos tus tiempos de respuesta.",
      benefits: [
        "Sincronización de catálogo y stock",
        "Respuestas y avisos automáticos por WhatsApp",
        "Cero tareas repetitivas de copiar y pegar",
      ],
      ctaText: "Consultar integraciones",
      isPrimary: true,
    },
    {
      id: "Desarrollo Web",
      icon: IconWorld,
      badge: "Prioritario",
      title: "Desarrollo web y e-commerce",
      subtitle: "Una web que presenta, convence y genera ventas.",
      description:
        "Diseñamos y construimos plataformas web ultrarrápidas, adaptadas a dispositivos móviles y optimizadas para conversión. Tu marca transmitirá autoridad inmediata.",
      benefits: [
        "Carga instantánea y SEO optimizado",
        "Experiencia de compra sin trabas",
        "Diseño 100% fiel a tu identidad",
      ],
      ctaText: "Cotizar sitio o e-commerce",
      isPrimary: true,
    },
    {
      id: "Facturación",
      icon: IconReceipt,
      badge: "Prioritario",
      title: "Sistemas de facturación y gestión",
      subtitle: "Ventas, comprobantes y operación centralizada.",
      description:
        "Plataformas para emitir comprobantes AFIP/Fiscales de forma ágil, controlar cobros, consultar clientes y visualizar reportes en tiempo real desde cualquier lugar.",
      benefits: [
        "Emisión de comprobantes en segundos",
        "Control claro de cuentas corrientes y caja",
        "Reportes visuales para tomar decisiones",
      ],
      ctaText: "Ver sistema de facturación",
      isPrimary: true,
    },
    {
      id: "A Medida",
      icon: IconCpu,
      badge: "Especializado",
      title: "Sistemas a medida",
      subtitle: "Software diseñado exactamente para tu modelo de negocio.",
      description:
        "Cuando las herramientas comerciales del mercado quedan chicas o son demasiado complejas, creamos paneles, portales de clientes y flujos operativos según tus reglas.",
      benefits: [
        "Lógica y roles adaptados a tu equipo",
        "Propiedad total de la plataforma",
        "Evolución continua sin sorpresas",
      ],
      ctaText: "Diseñar software a medida",
      isPrimary: false,
    },
    {
      id: "IA Aplicada",
      icon: IconCpu,
      badge: "Innovación",
      title: "Inteligencia artificial aplicada",
      subtitle: "IA para agilizar consultas, documentos y análisis.",
      description:
        "Implementamos asistentes inteligentes entrenados con el conocimiento de tu empresa para atender consultas frecuentes, clasificar datos o resumir información clave.",
      benefits: [
        "Atención 24/7 sin saturar al equipo",
        "Búsqueda instantánea en documentos internos",
        "Extracción automática de datos",
      ],
      ctaText: "Explorar soluciones IA",
      isPrimary: false,
    },
    {
      id: "Mantenimiento",
      icon: IconSettings,
      badge: "Continuidad",
      title: "Mantenimiento y evolución",
      subtitle: "Acompañamos la salud y mejora de tus plataformas.",
      description:
        "Monitoreo técnico, actualizaciones de seguridad, optimización de velocidad y desarrollo constante de nuevas funciones a medida que tu empresa crece.",
      benefits: [
        "Soporte preventivo y resolutivo",
        "Actualizaciones de tecnología",
        "Mejoras de rendimiento periódicas",
      ],
      ctaText: "Planes de soporte técnico",
      isPrimary: false,
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setContactModalOpen(true);
  };

  return (
    <section id="servicios" className="py-20 md:py-28 bg-[var(--gris-azulado)]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="gold">Servicios Digitales</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
            Herramientas digitales que <br className="hidden sm:inline" />
            <span className="text-[var(--azul-profundo)]">resuelven problemas reales.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--gris-pizarra)]">
            Cada módulo está enfocado en entregar un resultado concreto para tu facturación, velocidad operativa u organización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`rounded-2xl bg-white border p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/8 ${
                  service.isPrimary
                    ? "border-blue-200 ring-1 ring-blue-900/5"
                    : "border-slate-200"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[var(--gris-azulado)] text-[var(--azul-codeah)] flex items-center justify-center">
                      <Icon size={26} />
                    </div>
                    <Badge
                      variant={service.isPrimary ? "gold" : "secondary"}
                      className="text-[11px]"
                    >
                      {service.badge}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-sora font-bold text-[var(--azul-codeah)]">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--dorado-codeah)] mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-[var(--gris-pizarra)] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-3 space-y-2 border-t border-slate-100">
                    {service.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-[var(--azul-codeah)] font-medium">
                        <IconCircleCheck size={18} className="text-[var(--verde-exito)] shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Button
                    variant={service.isPrimary ? "default" : "outline"}
                    size="default"
                    onClick={() => handleServiceClick(service.id)}
                    className="w-full justify-between group"
                  >
                    <span>{service.ctaText}</span>
                    <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
        defaultService={selectedService}
      />
    </section>
  );
}
