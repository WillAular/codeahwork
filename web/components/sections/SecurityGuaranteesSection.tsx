"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { IconShieldCheck, IconShieldLock, IconKey, IconThumbUp, IconCircleCheck } from "@tabler/icons-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in";

export function SecurityGuaranteesSection() {
  const guarantees = [
    {
      icon: IconKey,
      title: "Propiedad Intelectual 100% Tuya",
      description:
        "Todo el código fuente y las bases de datos desarrollados pertenecen enteramente a tu empresa. Sin mensualidades ni bloqueos de licencia.",
    },
    {
      icon: IconThumbUp,
      title: "30 Días de Garantía Post-Lanzamiento",
      description:
        "Tras la puesta en marcha, tenés 30 días de monitoreo y soporte preventivo sin costo adicional para afinar cualquier detalle operativo.",
    },
    {
      icon: IconShieldLock,
      title: "Seguridad & Cifrado Criptográfico",
      description:
        "Toda la comunicación de datos se transmite mediante protocolos cifrados SSL/TLS y entornos aislados cumpliendo estándares de privacidad.",
    },
    {
      icon: IconCircleCheck,
      title: "Cumplimiento AFIP & WebServices",
      description:
        "Tuestras soluciones de facturación e integración cumplen con las normativas fiscales y técnicas actualizadas de AFIP y pasarelas oficiales.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--azul-profundo)] text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="gold" className="text-[11px] uppercase tracking-wider">
            <IconShieldCheck size={14} className="mr-1 text-[var(--azul-profundo)]" />
            Compromiso de Calidad Codeah
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-white tracking-tight">
            Garantías claras para tu tranquilidad.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Protegemos tu inversión, tus datos y la continuidad de tu negocio con estándares internacionales.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeInStaggerItem
                key={idx}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4 hover:border-[var(--dorado-codeah)]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--dorado-codeah)]/20 text-[var(--dorado-codeah)] flex items-center justify-center border border-[var(--dorado-codeah)]/30">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-sora font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
