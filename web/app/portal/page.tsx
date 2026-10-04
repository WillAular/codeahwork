"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconCheck,
  IconClock,
  IconExternalLink,
  IconDownload,
  IconShieldCheck,
  IconRocket,
  IconCode,
  IconLayout,
  IconSearch,
  IconBuildingStore,
  IconUser,
  IconRefresh,
} from "@tabler/icons-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in";

export default function ClientPortalPage() {
  const [projectCode, setProjectCode] = React.useState("CDH-2026-001");
  const [loading, setLoading] = React.useState(false);

  // Mock initial project data fetched from NestJS API (or fallback for demonstration)
  const [project, setProject] = React.useState({
    name: "Sistema Integral de Gestión & Facturación AFIP",
    code: "CDH-2026-001",
    clientName: "Distribuidora del Sur S.A.",
    stage: "DESARROLLO", // RELEVAMIENTO, DISENO, DESARROLLO, PUESTA_EN_MARCHA, FINALIZADO
    progressPct: 65,
    startDate: "2026-09-01",
    targetDate: "2026-09-25",
    managerName: "Equipo Técnico Codeah",
    milestones: [
      {
        id: 1,
        title: "Reunión de relevamiento & Mapa de Procesos",
        stage: "RELEVAMIENTO",
        isCompleted: true,
        dueDate: "2026-09-03",
      },
      {
        id: 2,
        title: "Prototipo interactivo navegable (Figma UI)",
        stage: "DISENO",
        isCompleted: true,
        dueDate: "2026-09-08",
      },
      {
        id: 3,
        title: "Desarrollo de módulos e integración AFIP WebService",
        stage: "DESARROLLO",
        isCompleted: false,
        dueDate: "2026-09-18",
      },
      {
        id: 4,
        title: "Pruebas de estrés & Capacitación del equipo",
        stage: "PUESTA_EN_MARCHA",
        isCompleted: false,
        dueDate: "2026-09-22",
      },
      {
        id: 5,
        title: "Puesta en producción & Entrega final",
        stage: "PUESTA_EN_MARCHA",
        isCompleted: false,
        dueDate: "2026-09-25",
      },
    ],
    deliverables: [
      {
        title: "Documento de Arquitectura y Especificación Técnica",
        url: "#",
        type: "PDF",
      },
      {
        title: "Prototipo Navegable en Figma",
        url: "https://figma.com",
        type: "LINK",
      },
      {
        title: "Servidor de Pruebas (Staging Environment)",
        url: "https://staging.codeah.app",
        type: "LINK",
      },
    ],
  });

  const stages = [
    { key: "RELEVAMIENTO", label: "01. Relevamiento", icon: IconSearch },
    { key: "DISENO", label: "02. Diseño UI/UX", icon: IconLayout },
    { key: "DESARROLLO", label: "03. Desarrollo API", icon: IconCode },
    { key: "PUESTA_EN_MARCHA", label: "04. Puesta en marcha", icon: IconRocket },
  ];

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5003/api";
      const res = await fetch(`${apiUrl}/projects/${projectCode}/status`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
      }
    } catch (e) {
      console.log("Using local project state fallback");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--blanco-calido)] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Portal Banner Header */}
        <FadeIn className="bg-[var(--azul-codeah)] text-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-blue-950/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="gold" className="text-[11px] uppercase tracking-wider font-mono font-bold">
                PORTAL DE CLIENTES CODEAH
              </Badge>
              <span className="text-xs text-slate-300 font-mono">CÓDIGO: {project.code}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-sora font-extrabold tracking-tight text-white">
              {project.name}
            </h1>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <IconBuildingStore size={16} className="text-[var(--dorado-codeah)]" />
                {project.clientName}
              </span>
              <span className="flex items-center gap-1.5">
                <IconUser size={16} className="text-[var(--dorado-codeah)]" />
                {project.managerName}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto relative z-10 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold"
            >
              <IconRefresh size={16} className={`mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Actualizar Estado
            </Button>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-center">
              <p className="text-[10px] text-slate-300 font-mono uppercase">Entrega estimada</p>
              <p className="text-sm font-sora font-bold text-[var(--dorado-codeah)]">
                {project.targetDate}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Progress Tracker Card */}
        <FadeIn delay={0.1} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-xl font-sora font-bold text-[var(--azul-codeah)]">
                Estado Actual del Proyecto
              </h2>
              <p className="text-xs sm:text-sm text-[var(--gris-pizarra)]">
                Monitoreo en tiempo real de cada etapa de desarrollo.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[var(--gris-azulado)] px-4 py-2 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-[var(--azul-codeah)] font-mono">AVANCE GLOBAL:</span>
              <span className="text-xl font-sora font-extrabold text-[var(--azul-codeah)]">
                {project.progressPct}%
              </span>
            </div>
          </div>

          {/* Progress bar line */}
          <div className="space-y-2">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-gradient-to-r from-[var(--azul-codeah)] via-blue-600 to-[var(--dorado-codeah)] h-full rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${project.progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Inicio: {project.startDate}</span>
              <span>Finalización: {project.targetDate}</span>
            </div>
          </div>

          {/* 4 Stages Navigator Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              const isCurrent = project.stage === st.key;
              const isPast =
                (st.key === "RELEVAMIENTO" && ["DISENO", "DESARROLLO", "PUESTA_EN_MARCHA", "FINALIZADO"].includes(project.stage)) ||
                (st.key === "DISENO" && ["DESARROLLO", "PUESTA_EN_MARCHA", "FINALIZADO"].includes(project.stage)) ||
                (st.key === "DESARROLLO" && ["PUESTA_EN_MARCHA", "FINALIZADO"].includes(project.stage));

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    isCurrent
                      ? "bg-[var(--azul-codeah)] text-white border-[var(--azul-codeah)] shadow-md scale-[1.02]"
                      : isPast
                      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                      : "bg-slate-50 text-slate-400 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} className={isCurrent ? "text-[var(--dorado-codeah)]" : isPast ? "text-emerald-600" : "text-slate-400"} />
                    {isPast && <IconCheck size={16} className="text-emerald-600 font-bold" />}
                    {isCurrent && <Badge variant="gold" className="text-[9px] px-1.5 py-0">ACTUAL</Badge>}
                  </div>
                  <span className="font-sora font-bold text-xs sm:text-sm">
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Grid: Milestones & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Milestones Column (7 Cols) */}
          <FadeIn delay={0.2} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-sora font-bold text-[var(--azul-codeah)]">
                  Cronograma de Hitos y Entregas
                </h3>
                <p className="text-xs text-[var(--gris-pizarra)]">
                  Verificá el estado detallado de cada entregable parcial.
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {project.milestones.filter(m => m.isCompleted).length} / {project.milestones.length} completados
              </Badge>
            </div>

            <div className="space-y-3">
              {project.milestones.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-colors ${
                    m.isCompleted
                      ? "bg-slate-50/80 border-slate-200 text-slate-600"
                      : "bg-white border-amber-200/80 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        m.isCompleted
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {m.isCompleted ? <IconCheck size={16} /> : <IconClock size={16} />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-sora font-semibold ${m.isCompleted ? "line-through text-slate-500" : "text-[var(--azul-codeah)]"}`}>
                        {m.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Fecha límite: {m.dueDate}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant={m.isCompleted ? "success" : "gold"}
                    className="text-[10px] shrink-0"
                  >
                    {m.isCompleted ? "COMPLETADO" : "EN PROCESO"}
                  </Badge>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Shared Links & Assets Column (5 Cols) */}
          <FadeIn delay={0.3} className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-sora font-bold text-[var(--azul-codeah)]">
                  Recursos & Enlaces del Proyecto
                </h3>
                <p className="text-xs text-[var(--gris-pizarra)]">
                  Archivos de arquitectura, prototipos y servidores de prueba.
                </p>
              </div>

              <div className="space-y-3">
                {project.deliverables.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl border border-slate-200 bg-[var(--gris-azulado)]/40 hover:bg-[var(--gris-azulado)] hover:border-slate-300 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white text-[var(--azul-codeah)] flex items-center justify-center border border-slate-200 shadow-xs">
                        {item.type === "PDF" ? <IconDownload size={18} /> : <IconExternalLink size={18} />}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-sora font-bold text-[var(--azul-codeah)] group-hover:text-[var(--dorado-codeah)] transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">{item.type}</span>
                      </div>
                    </div>
                    <IconExternalLink size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--azul-codeah)]">
                <IconShieldCheck size={18} className="text-[var(--verde-exito)]" />
                <span>Garantía activa de soporte y confidencialidad</span>
              </div>
              <p className="text-[11px] text-[var(--gris-pizarra)]">
                Si requerís realizar ajustes en los requerimientos o consultar a un ingeniero de Codeah, comunicate directamente a través de nuestros canales oficiales.
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
