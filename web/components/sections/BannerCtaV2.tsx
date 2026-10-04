"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  IconWand,
  IconShieldCheck,
  IconSend,
  IconCheck,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMessage,
  IconSparkles,
  IconMail,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { apiRequest } from "@/lib/api-client";
import { FadeIn } from "@/components/ui/fade-in";

export function BannerCtaV2() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "General",
    message: "",
  });

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
      source: "web_inline_contact_form",
    };

    try {
      await apiRequest("/leads", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error al guardar lead:", err);
      setErrorMessage(
        err.message || "Ocurrió un error al enviar tu propuesta. Intentá nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "General",
      message: "",
    });
    setErrorMessage(null);
    setSubmitted(false);
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-[var(--azul-profundo)] via-[var(--azul-codeah)] to-[#10244C] text-white p-6 sm:p-10 md:p-14 overflow-hidden shadow-2xl shadow-blue-950/20">
            {/* Background Orbs Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--dorado-codeah)]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start relative z-10">
              {/* Left Column: Heading, Info & Social Links */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-amber-400/20">
                  <IconWand size={15} />
                  <span>COMENZÁ HOY SIN COMPROMISO</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-white leading-tight tracking-tight">
                  ¿Listo para potenciar la tecnología de tu empresa?
                </h2>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Contanos tu proyecto o proceso a mejorar. Te responderemos
                  personalmente con una propuesta clara, presupuesto cerrado y
                  tiempos firmes.
                </p>

                {/* Guarantee Features */}
                <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <IconShieldCheck size={18} className="text-emerald-400 shrink-0" />
                    <span>Sin costos ocultos ni compromisos iniciales</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <IconShieldCheck size={18} className="text-[var(--dorado-codeah)] shrink-0" />
                    <span>Código 100% de tu propiedad e infraestructura propia</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <IconMessage size={18} className="text-sky-400 shrink-0" />
                    <span>Respuesta personalizada en menos de 24 hs</span>
                  </div>
                </div>

                {/* Direct Contact & Social Networks Box */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Contacto directo:
                    </span>
                    <div className="flex flex-col gap-2 text-xs sm:text-sm">
                      <a
                        href="mailto:codeahsistemas@gmail.com"
                        className="inline-flex items-center gap-2.5 text-slate-200 hover:text-amber-300 transition-colors"
                      >
                        <IconMail size={18} className="text-amber-400 shrink-0" />
                        <span>codeahsistemas@gmail.com</span>
                      </a>
                      <a
                        href="https://wa.me/5491136490804"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-slate-200 hover:text-emerald-300 transition-colors font-medium"
                      >
                        <IconBrandWhatsapp size={18} className="text-emerald-400 shrink-0" />
                        <span>+54 9 11 3649-0804</span>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Redes sociales:
                    </span>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://www.linkedin.com/in/codeah-sistemas-783b16305/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-medium text-white hover:bg-white/20 hover:border-amber-400/40 transition-all shadow-sm"
                      >
                        <IconBrandLinkedin size={16} className="text-amber-400" />
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href="https://www.instagram.com/codeahsistemas/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-medium text-white hover:bg-white/20 hover:border-amber-400/40 transition-all shadow-sm"
                      >
                        <IconBrandInstagram size={16} className="text-amber-400" />
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Contact Form Card */}
              <div className="lg:col-span-7 bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 text-slate-900 shadow-xl border border-slate-100">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                        {errorMessage}
                      </div>
                    )}

                    <div className="space-y-1 mb-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
                        <IconSparkles size={16} className="text-[var(--dorado-codeah)]" />
                        <span>Formulario de contacto directo</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-sora font-extrabold text-[var(--azul-codeah)]">
                        Hablemos de tu proyecto
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Completá los datos a continuación y nos pondremos en contacto rápido.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
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
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
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
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
                          Email *
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="contacto@empresa.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
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
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
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
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
                        ¿Cuál es el desafío principal? *
                      </label>
                      <Textarea
                        required
                        placeholder="Ej: Necesitamos conectar la facturación con WhatsApp y centralizar pedidos..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        variant="gold"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-6 text-base font-bold shadow-lg shadow-amber-500/20 group hover:scale-[1.01] transition-transform"
                      >
                        {loading ? (
                          "Enviando propuesta..."
                        ) : (
                          <>
                            <span>Enviar mensaje ahora</span>
                            <IconSend size={18} />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-emerald-100 text-[var(--verde-exito)] rounded-full flex items-center justify-center mx-auto">
                      <IconCheck size={32} />
                    </div>
                    <h3 className="text-2xl font-sora font-extrabold text-[var(--azul-codeah)]">
                      ¡Consulta enviada con éxito!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Muchas gracias <strong>{formData.name || "por escribirnos"}</strong>. Revisaremos tu requerimiento y te responderemos en breve.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="mt-4 border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      Enviar otra consulta
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
