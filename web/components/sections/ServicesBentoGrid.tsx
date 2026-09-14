"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconBolt,
  IconWorld,
  IconReceipt,
  IconCpu,
  IconArrowRight,
  IconCircleCheck,
} from "@tabler/icons-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in";

export function ServicesBentoGrid() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("General");

  const services = [
    {
      id: "Integraciones",
      icon: IconBolt,
      bgTint: "bg-blue-50 text-blue-600 border-blue-100",
      title: "Integraciones & WhatsApp API",
      subtitle: "Conectamos tus sistemas y canales de venta.",
      description:
        "Sincronizamos e-commerce, WhatsApp API, CRMs y bases de datos para responder consultas automáticas y eliminar el tipeo manual.",
      highlights: ["Catálogo y stock en tiempo real", "Respuestas automáticas 24/7"],
    },
    {
      id: "Desarrollo Web",
      icon: IconWorld,
      bgTint: "bg-cyan-50 text-cyan-600 border-cyan-100",
      title: "Desarrollo Web & E-Commerce",
      subtitle: "Plataformas veloces diseñadas para convertir.",
      description:
        "Construimos sitios web y tiendas virtuales ultrarrápidas, 100% adaptables a celulares y posicionadas en buscadores.",
      highlights: ["Carga instantánea y SEO", "Experiencia de compra fluida"],
    },
    {
      id: "Facturación",
      icon: IconReceipt,
      bgTint: "bg-amber-50 text-amber-600 border-amber-100",
      title: "Facturación AFIP & Gestión",
      subtitle: "Ventas, comprobantes y cuentas corrientes.",
      description:
        "Emití comprobantes de AFIP (A, B, C) en segundos, gestioná clientes y visualizá reportes financieros desde cualquier lugar.",
      highlights: ["Emisión de comprobantes en 1-click", "Control de caja y reportes"],
    },
    {
      id: "IA Aplicada",
      icon: IconCpu,
      bgTint: "bg-emerald-50 text-emerald-600 border-emerald-100",
      title: "IA Aplicada & Automatizaciones",
      subtitle: "Inteligencia artificial adaptada a tu negocio.",
      description:
        "Implementamos asistentes con IA entrenados con la información de tu empresa para acelerar consultas y resumir documentos.",
      highlights: ["Extracción automática de datos", "Atención inteligente de leads"],
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setContactModalOpen(true);
  };

  return (
    <section id="servicios" className="py-20 md:py-28 bg-[var(--gris-azulado)]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header Left Column */}
          <FadeIn className="lg:col-span-4 space-y-6">
            <Badge variant="gold">NUESTROS SERVICIOS</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
              Todo lo que necesitás para digitalizar tu empresa.
            </h2>
            <p className="text-base text-[var(--gris-pizarra)] leading-relaxed">
              Módulos flexibles construidos a la medida de tus procesos operativos para maximizar ventas y ahorrar tiempo.
            </p>
            <div>
              <Button
                variant="default"
                size="lg"
                onClick={() => handleServiceClick("General")}
                className="rounded-full px-8 font-bold group"
              >
                <span>Explorar catálogo completo</span>
                <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </FadeIn>

          {/* Bento Grid 4 Cards Right Column */}
          <FadeInStagger className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <FadeInStaggerItem
                  key={service.id}
                  className="rounded-3xl bg-white border border-slate-200/80 p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:border-[var(--azul-codeah)]/40 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="space-y-4">
                    {/* Pastel soft icon container */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${service.bgTint} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon size={28} />
                    </div>

                    <div>
                      <h3 className="text-xl font-sora font-bold text-[var(--azul-codeah)]">
                        {service.title}
                      </h3>
                      <p className="text-xs font-semibold text-[var(--dorado-codeah)] mt-1">
                        {service.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--gris-pizarra)] leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-3 space-y-1.5 border-t border-slate-100">
                      {service.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-[var(--azul-codeah)]">
                          <IconCircleCheck size={16} className="text-[var(--verde-exito)] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4">
                    <button
                      onClick={() => handleServiceClick(service.id)}
                      className="text-xs font-bold text-[var(--azul-codeah)] hover:text-[var(--dorado-codeah)] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Solicitar propuesta para este servicio</span>
                      <IconArrowRight size={16} />
                    </button>
                  </div>
                </FadeInStaggerItem>
              );
            })}
          </FadeInStagger>

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
