"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";
import { ContactModal } from "@/components/sections/ContactModal";

export function StickyMobileCTA() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <Button
            variant="gold"
            size="default"
            onClick={() => setContactModalOpen(true)}
            className="flex-1 justify-center text-sm font-bold shadow-md"
          >
            <span>Solicitar propuesta</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <a
            href="https://wa.me/?text=Hola%20Codeah,%20quiero%20consultar%20por%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center shrink-0"
            aria-label="Contactar por WhatsApp"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
        </div>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </>
  );
}
