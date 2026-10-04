"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Send, Sparkles, ShieldCheck } from "lucide-react";

import { apiRequest } from "@/lib/api-client";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
}

export function ContactModal({
  isOpen,
  onOpenChange,
  defaultService = "General",
}: ContactModalProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: defaultService,
    message: "",
  });

  React.useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const payload = {
      name: formData.name,
      company: formData.company || undefined,
      email: formData.email,
      phone: formData.phone,
      serviceRequested: formData.service || "General",
      message: formData.message,
      source: "web_contact_modal",
    };

    try {
      await apiRequest("/leads", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error al registrar lead:", err);
      setErrorMessage(
        err.message || "Ocurrió un error al enviar tu consulta. Por favor, intentá nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] border-none shadow-2xl p-6 md:p-8">
        {!submitted ? (
          <>
            <DialogHeader className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <Badge variant="gold">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Consulta sin compromiso
                </Badge>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-sora font-extrabold text-[var(--azul-codeah)]">
                Hablemos de tu proyecto
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base text-[var(--gris-pizarra)]">
                Contanos qué proceso o idea querés mejorar. Te respondemos personalmente con una propuesta clara y accionable.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--azul-codeah)]">
                    Tu nombre *
                  </label>
                  <Input
                    required
                    placeholder="Ej. Martín González"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--azul-codeah)]">
                    Tu empresa / negocio
                  </label>
                  <Input
                    placeholder="Ej. Distribuidora del Sur"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--azul-codeah)]">
                    Email *
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="correo@empresa.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--azul-codeah)]">
                    WhatsApp / Teléfono *
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="+54 9 11 0000 0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--azul-codeah)]">
                  Área de interés
                </label>
                <select
                  className="flex h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[var(--azul-codeah)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--azul-codeah)] cursor-pointer"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                >
                  <option value="Integraciones">Integraciones y automatizaciones</option>
                  <option value="Desarrollo Web">Desarrollo web y e-commerce</option>
                  <option value="Facturación">Sistemas de facturación y gestión</option>
                  <option value="A Medida">Sistema a medida</option>
                  <option value="IA Aplicada">Inteligencia artificial aplicada</option>
                  <option value="Mantenimiento">Mantenimiento y evolución</option>
                  <option value="General">Otro / Asesoramiento general</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--azul-codeah)]">
                  ¿Cuál es el desafío principal? *
                </label>
                <Textarea
                  required
                  placeholder="Ej: Necesitamos conectar la facturación con WhatsApp y centralizar pedidos de nuestra tienda..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <Button
                  type="submit"
                  size="lg"
                  variant="gold"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Enviando consulta..."
                  ) : (
                    <>
                      Enviar propuesta <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
                <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-[var(--gris-pizarra)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Sin compromisos comerciales. Respuesta rápida garantizada.</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-600">
                    <a href="mailto:codeahsistemas@gmail.com" className="hover:text-[var(--azul-codeah)] underline">
                      codeahsistemas@gmail.com
                    </a>
                    <span>•</span>
                    <a href="https://wa.me/5491136490804" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--azul-codeah)] underline">
                      +54 9 11 3649-0804
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-[var(--verde-exito)] rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-sora font-extrabold text-[var(--azul-codeah)]">
              ¡Consulta recibida con éxito!
            </h3>
            <p className="text-base text-[var(--gris-pizarra)] max-w-md mx-auto">
              Muchas gracias <strong>{formData.name || "por comunicarte"}</strong>. Nos pondremos en contacto a la brevedad para analizar la mejor solución para tu negocio.
            </p>
            <Button variant="default" onClick={handleReset} className="mt-4">
              Cerrar ventana
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
