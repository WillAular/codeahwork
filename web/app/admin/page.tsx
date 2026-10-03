"use client";

import * as React from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconInbox,
  IconBriefcase,
  IconUsers,
  IconArrowRight,
  IconClock,
  IconCircleCheck,
  IconPlus,
  IconRefresh,
  IconSparkles,
} from "@tabler/icons-react";

export default function AdminDashboardPage() {
  const [leads, setLeads] = React.useState<any[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, projectsRes] = await Promise.allSettled([
        apiRequest("/leads"),
        apiRequest("/projects"),
      ]);

      if (leadsRes.status === "fulfilled" && Array.isArray(leadsRes.value)) {
        setLeads(leadsRes.value);
      }
      if (projectsRes.status === "fulfilled" && Array.isArray(projectsRes.value)) {
        setProjects(projectsRes.value);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const newLeadsCount = leads.filter((l) => l.status === "NUEVO").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20 mb-2">
            <IconSparkles size={14} />
            <span>CENTRO DE CONTROL GENERAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sora font-extrabold text-white">
            Resumen Operativo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitoreo en tiempo real de consultas entrantes y proyectos de clientes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
          >
            <IconRefresh size={16} className={`mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Link href="/admin/projects">
            <Button variant="gold" size="sm" className="font-bold flex items-center gap-1.5">
              <IconPlus size={16} />
              <span>Nuevo Proyecto</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Leads Total */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Prospectos Totales
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <IconInbox size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-sora font-extrabold text-white">
              {leads.length}
            </span>
            {newLeadsCount > 0 && (
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                {newLeadsCount} nuevos
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            Consultas recibidas a través de la web
          </p>
        </div>

        {/* Card 2: Active Projects */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Proyectos en Curso
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <IconBriefcase size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-sora font-extrabold text-white">
              {projects.length}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Sistemas en desarrollo y producción
          </p>
        </div>

        {/* Card 3: Pending Leads */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sin Responder
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <IconClock size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-sora font-extrabold text-white">
              {newLeadsCount}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Requieren propuesta o primer contacto
          </p>
        </div>

        {/* Card 4: Conversion / Status */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Estado Backend
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <IconCircleCheck size={18} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-emerald-400">API Conectada</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Endpoints de NestJS operando normalmente
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Leads & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Leads Table (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-sora font-bold text-white">
                Últimos Prospectos Capturados
              </h3>
              <p className="text-xs text-slate-400">
                Contactos enviados desde el formulario web.
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Ver todos ({leads.length})</span>
              <IconArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              Cargando prospectos...
            </div>
          ) : leads.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <IconInbox size={36} className="mx-auto opacity-40" />
              <p className="text-sm">No hay prospectos registrados aún.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-sora font-bold text-white truncate">
                        {lead.name}
                      </h4>
                      {lead.company && (
                        <span className="text-xs text-slate-400 truncate">
                          ({lead.company})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {lead.email} • {lead.serviceRequested}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      lead.status === "NUEVO"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : lead.status === "CONTACTADO"
                        ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                        : lead.status === "GANADO"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Active Projects Summary (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-sora font-bold text-white">
                Proyectos Activos
              </h3>
              <p className="text-xs text-slate-400">
                Estado de avance visible en el portal cliente.
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Gestionar</span>
              <IconArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              Cargando proyectos...
            </div>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <IconBriefcase size={36} className="mx-auto opacity-40" />
              <p className="text-sm">No hay proyectos activos registrados.</p>
              <Link href="/admin/projects">
                <Button variant="outline" size="sm" className="mt-2 text-xs border-slate-700">
                  Crear Primer Proyecto
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-sora font-bold text-white truncate">
                      {proj.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {proj.progressPct || 0}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${proj.progressPct || 0}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Cliente: {proj.clientName || "Sin asignar"}</span>
                    <span className="uppercase font-mono text-[10px] text-slate-500">
                      {proj.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
