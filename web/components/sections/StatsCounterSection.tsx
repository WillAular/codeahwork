"use client";

import * as React from "react";
import { IconBolt, IconReceipt, IconClock, IconStar } from "@tabler/icons-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in";

export function StatsCounterSection() {
  const stats = [
    {
      icon: IconBolt,
      value: "+40",
      label: "Empresas & PYMEs",
      subtitle: "Soluciones a medida en producción",
      bgTint: "bg-blue-50 text-blue-600",
    },
    {
      icon: IconReceipt,
      value: "+150K",
      label: "Comprobantes Emitidos",
      subtitle: "Facturas AFIP automatizadas sin fricción",
      bgTint: "bg-amber-50 text-[var(--dorado-codeah)]",
    },
    {
      icon: IconClock,
      value: "99.9%",
      label: "Uptime de Integraciones",
      subtitle: "Disponibilidad en servidores y APIs",
      bgTint: "bg-emerald-50 text-[var(--verde-exito)]",
    },
    {
      icon: IconStar,
      value: "4.9 / 5",
      label: "Satisfacción de Clientes",
      subtitle: "Valoración en soporte y desarrollo",
      bgTint: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="py-14 bg-[var(--gris-azulado)]/40 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeInStaggerItem
                key={idx}
                className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bgTint}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
                    {item.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-sora font-bold text-[var(--azul-codeah)]">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-[var(--gris-pizarra)] font-normal">
                    {item.subtitle}
                  </p>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
