"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, Check, ArrowRight, Sparkles, Clock, Layers } from "lucide-react";
import { ContactModal } from "@/components/sections/ContactModal";
import { FadeIn } from "@/components/ui/fade-in";

export function SolutionsCalculator() {
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [projectType, setProjectType] = React.useState<"web" | "facturacion" | "integracion">("web");
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>(["responsive", "seo"]);

  const featureOptions = {
    web: [
      { id: "responsive", name: "Diseño Web Ultra-Rápido & Mobile", tag: "Base" },
      { id: "seo", name: "Optimización SEO Google", tag: "Base" },
      { id: "ecommerce", name: "Catálogo Online & Carrito de Compras", tag: "Avanzado" },
      { id: "whatsapp", name: "Botón & Consulta Directa WhatsApp", tag: "Popular" },
      { id: "pagos", name: "Integración Pasarela de Pagos", tag: "Avanzado" },
      { id: "admin", name: "Panel de Gestión de Contenido", tag: "Base" },
    ],
    facturacion: [
      { id: "afip", name: "Facturación Electrónica AFIP A, B, C", tag: "Base" },
      { id: "clientes", name: "Gestión de Clientes y Cuentas Corrientes", tag: "Base" },
      { id: "reportes", name: "Reportes Financieros y Ventas", tag: "Popular" },
      { id: "whatsapp_pdf", name: "Envío de PDF por WhatsApp", tag: "Popular" },
      { id: "multi_sucursal", name: "Soporte Multi-Caja / Multi-Sucursal", tag: "Empresa" },
      { id: "stock", name: "Control de Inventario y Alertas", tag: "Avanzado" },
    ],
    integracion: [
      { id: "apis", name: "Conexión de APIs entre Sistemas", tag: "Base" },
      { id: "whatsapp_bot", name: "Automatización Mensajes WhatsApp", tag: "Popular" },
      { id: "crm", name: "Sincronización con CRM / ERP", tag: "Avanzado" },
      { id: "excel", name: "Importación/Exportación de planillas", tag: "Base" },
      { id: "ia_doc", name: "Lectura inteligente de documentos con IA", tag: "IA" },
      { id: "alertas", name: "Alertas automáticas por correo / notificación", tag: "Base" },
    ],
  };

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const handleTypeChange = (type: "web" | "facturacion" | "integracion") => {
    setProjectType(type);
    // Reset selections to defaults for that type
    if (type === "web") setSelectedFeatures(["responsive", "seo"]);
    if (type === "facturacion") setSelectedFeatures(["afip", "clientes"]);
    if (type === "integracion") setSelectedFeatures(["apis", "whatsapp_bot"]);
  };

  // Estimated timeframe calculation based on selected features
  const estimatedDays = 7 + selectedFeatures.length * 3;

  return (
    <section id="cotizador" className="py-20 md:py-28 bg-[var(--blanco-calido)] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="gold">
            <Calculator className="w-3.5 h-3.5 mr-1" /> Orientador de Proyectos
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-extrabold text-[var(--azul-codeah)] tracking-tight">
            Estimá el alcance de tu solución.
          </h2>
          <p className="text-base sm:text-lg text-[var(--gris-pizarra)]">
            Seleccioná qué tipo de proyecto necesitas y las funciones clave. Te dará una referencia clara de tiempo y estructura.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-950/5 p-6 md:p-10">
          {/* Step 1: Select Project Type */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
              1. Seleccioná la solución principal:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleTypeChange("web")}
                className={`p-4 rounded-xl border text-left font-sora font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${
                  projectType === "web"
                    ? "border-[var(--azul-codeah)] bg-[var(--azul-codeah)] text-white shadow-md"
                    : "border-slate-200 bg-[var(--gris-azulado)] text-[var(--azul-codeah)] hover:bg-slate-200"
                }`}
              >
                <span>Desarrollo Web & E-commerce</span>
                {projectType === "web" && <Check className="w-5 h-5 text-[var(--dorado-codeah)]" />}
              </button>

              <button
                onClick={() => handleTypeChange("facturacion")}
                className={`p-4 rounded-xl border text-left font-sora font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${
                  projectType === "facturacion"
                    ? "border-[var(--azul-codeah)] bg-[var(--azul-codeah)] text-white shadow-md"
                    : "border-slate-200 bg-[var(--gris-azulado)] text-[var(--azul-codeah)] hover:bg-slate-200"
                }`}
              >
                <span>Sistema Facturación & Gestión</span>
                {projectType === "facturacion" && <Check className="w-5 h-5 text-[var(--dorado-codeah)]" />}
              </button>

              <button
                onClick={() => handleTypeChange("integracion")}
                className={`p-4 rounded-xl border text-left font-sora font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${
                  projectType === "integracion"
                    ? "border-[var(--azul-codeah)] bg-[var(--azul-codeah)] text-white shadow-md"
                    : "border-slate-200 bg-[var(--gris-azulado)] text-[var(--azul-codeah)] hover:bg-slate-200"
                }`}
              >
                <span>Integraciones & Automatización</span>
                {projectType === "integracion" && <Check className="w-5 h-5 text-[var(--dorado-codeah)]" />}
              </button>
            </div>
          </div>

          {/* Step 2: Select Features */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--azul-codeah)]">
              2. Módulos y funciones requeridas:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {featureOptions[projectType].map((feature) => {
                const isSelected = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-[var(--azul-codeah)] bg-[var(--gris-azulado)] text-[var(--azul-codeah)] font-semibold shadow-xs"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                          isSelected
                            ? "bg-[var(--azul-codeah)] border-[var(--azul-codeah)] text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs sm:text-sm">{feature.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                      {feature.tag}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Banner & Proposal CTA */}
          <div className="p-6 md:p-8 rounded-2xl bg-[var(--azul-profundo)] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-300 text-xs font-semibold">
                <Clock className="w-4 h-4" /> Estimación estimada de desarrollo
              </div>
              <h4 className="text-2xl sm:text-3xl font-sora font-extrabold text-white">
                Aproximadamente {estimatedDays} días hábiles
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Seleccionaste {selectedFeatures.length} módulos clave. Te entregamos un presupuesto cerrado con entregables claros.
              </p>
            </div>

            <Button
              variant="gold"
              size="lg"
              onClick={() => setContactModalOpen(true)}
              className="shrink-0 group w-full md:w-auto"
            >
              <span>Solicitar presupuesto formal</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </FadeIn>
      </div>

      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
        defaultService={
          projectType === "web"
            ? "Desarrollo Web"
            : projectType === "facturacion"
            ? "Facturación"
            : "Integraciones"
        }
      />
    </section>
  );
}
