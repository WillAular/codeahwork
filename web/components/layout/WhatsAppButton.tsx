"use client";

import * as React from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const whatsappUrl =
    "https://wa.me/5491136490804?text=Hola%20Codeah,%20quiero%20consultar%20por%20un%20proyecto";

  return (
    <div
      className="fixed bottom-20 sm:bottom-8 right-5 sm:right-8 z-50 flex items-center gap-3 group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Floating Tooltip Banner */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 text-white text-xs font-medium border border-slate-700 shadow-2xl transition-all duration-300 transform ${
          showTooltip
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-2 scale-95 pointer-events-none"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>¡Escribinos por WhatsApp!</span>
      </div>

      {/* WhatsApp Pulse Ring & Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        {/* Ambient Glow / Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />

        <IconBrandWhatsapp size={32} className="relative z-10 transition-transform group-hover:rotate-12" />
      </a>
    </div>
  );
}
