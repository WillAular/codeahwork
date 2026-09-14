"use client";

import * as React from "react";
import {
  IconUsers,
  IconChartBar,
  IconClock,
  IconCircleCheck,
  IconPlus,
  IconSearch,
  IconRefresh,
  IconMail,
  IconPhone,
  IconBuilding,
  IconCheck,
  IconArrowRight,
  IconDotsVertical,
  IconFolder,
  IconRocket,
  IconDeviceLaptop,
} from "@tabler/icons-react";

interface LeadItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceRequested: string;
  estimatedBudget: string;
  message: string;
  status: "NUEVO" | "CONTACTADO" | "PRESUPUESTADO" | "GANADO" | "PERDIDO";
  source: string;
  createdAt: string;
}

interface ProjectItem {
  id: number;
  code: string;
  name: string;
  clientName: string;
  stage: "RELEVAMIENTO" | "DISENO" | "DESARROLLO" | "PUESTA_EN_MARCHA" | "FINALIZADO";
  progressPct: number;
  targetDate: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<"kanban" | "leads" | "projects">("kanban");
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Default initial leads feed (syncs with NestJS Sequelize API)
  const [leads, setLeads] = React.useState<LeadItem[]>([
    {
      id: 1,
      name: "Martín González",
      email: "martin@distribuidorasur.com",
      phone: "+54 9 11 4589 1234",
      company: "Distribuidora del Sur S.A.",
      serviceRequested: "Facturación & AFIP",
      estimatedBudget: "$1.500 USD",
      message: "Necesitamos automatizar la emisión de facturas masivas y sincronizar stock con el local.",
      status: "GANADO",
      source: "web_contact_modal",
      createdAt: "2026-09-14 08:15",
    },
    {
      id: 2,
      name: "Carolina Rivas",
      email: "c.rivas@logisticaglobal.ar",
      phone: "+54 9 11 6712 9081",
      company: "Logística Global SRL",
      serviceRequested: "Integraciones API & WhatsApp",
      estimatedBudget: "$2.000 USD",
      message: "Consultamos para conectar nuestro sistema con la API de WhatsApp para avisos automáticos.",
      status: "NUEVO",
      source: "cotizador_orientador",
      createdAt: "2026-09-14 07:40",
    },
    {
      id: 3,
      name: "Alejandro López",
      email: "alopez@estudioscontables.com",
      phone: "+54 9 341 554 1122",
      company: "Estudio Contable López & Asoc.",
      serviceRequested: "Desarrollo Web & Portal",
      estimatedBudget: "$1.200 USD",
      message: "Queremos un portal para que nuestros clientes descarguen sus declaraciones y recibos.",
      status: "CONTACTADO",
      source: "web_contact_modal",
      createdAt: "2026-09-13 18:20",
    },
    {
      id: 4,
      name: "Lucía Fernández",
      email: "lucia@modachic.com.ar",
      phone: "+54 9 11 3321 8877",
      company: "ModaChic E-commerce",
      serviceRequested: "Desarrollo Web & E-commerce",
      estimatedBudget: "$900 USD",
      message: "Buscamos renovar nuestro sitio e-commerce con carga ultra rápida y Mercado Pago.",
      status: "PRESUPUESTADO",
      source: "cotizador_orientador",
      createdAt: "2026-09-12 14:10",
    },
  ]);

  // Active Projects
  const [projects, setProjects] = React.useState<ProjectItem[]>([
    {
      id: 101,
      code: "CDH-2026-001",
      name: "Sistema Integral de Gestión & Facturación AFIP",
      clientName: "Distribuidora del Sur S.A.",
      stage: "DESARROLLO",
      progressPct: 65,
      targetDate: "2026-09-25",
    },
    {
      id: 102,
      code: "CDH-2026-002",
      name: "Portal de Clientes & Descarga de Comprobantes",
      clientName: "Estudio Contable López & Asoc.",
      stage: "DISENO",
      progressPct: 35,
      targetDate: "2026-10-10",
    },
  ]);

  const fetchLeadsFromApi = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      const res = await fetch(`${apiUrl}/leads`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setLeads(data);
        }
      }
    } catch (e) {
      console.log("Using local state fallback for CRM");
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  React.useEffect(() => {
    fetchLeadsFromApi();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: LeadItem["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
      await fetch(`${apiUrl}/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.error("API status update error:", e);
    }
  };

  const statusColumns: LeadItem["status"][] = [
    "NUEVO",
    "CONTACTADO",
    "PRESUPUESTADO",
    "GANADO",
    "PERDIDO",
  ];

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.serviceRequested.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navbar */}
      <header className="bg-[#142B5C] text-white border-b border-blue-950 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D9A441] text-[#142B5C] font-extrabold flex items-center justify-center font-mono">
              C
            </div>
            <span className="font-extrabold text-lg tracking-tight font-sora">
              Codeah <span className="text-[#D9A441] font-normal text-xs uppercase ml-1 px-2 py-0.5 rounded-full bg-white/10">Control Panel</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchLeadsFromApi}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <IconRefresh size={14} className={loading ? "animate-spin" : ""} />
              <span>Sincronizar API</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white/20">
              AD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Summary Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Leads</p>
              <h3 className="text-2xl font-bold text-[#142B5C]">{leads.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#142B5C] flex items-center justify-center">
              <IconUsers size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Nuevos sin contactar</p>
              <h3 className="text-2xl font-bold text-amber-600">
                {leads.filter((l) => l.status === "NUEVO").length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <IconClock size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Proyectos Activos</p>
              <h3 className="text-2xl font-bold text-emerald-600">{projects.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IconRocket size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tasa Conversión</p>
              <h3 className="text-2xl font-bold text-[#142B5C]">
                {Math.round((leads.filter((l) => l.status === "GANADO").length / (leads.length || 1)) * 100)}%
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <IconChartBar size={22} />
            </div>
          </div>
        </div>

        {/* Tab Controls & Search Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("kanban")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "kanban"
                  ? "bg-[#142B5C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tablero Kanban Ventas
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "leads"
                  ? "bg-[#142B5C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Feed de Consultas ({filteredLeads.length})
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-[#142B5C] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Proyectos Clientes ({projects.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por cliente, empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#142B5C]"
            />
          </div>
        </div>

        {/* TAB 1: KANBAN BOARD */}
        {activeTab === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {statusColumns.map((colStatus) => {
              const colLeads = filteredLeads.filter((l) => l.status === colStatus);
              return (
                <div
                  key={colStatus}
                  className="bg-slate-100/70 rounded-2xl p-4 border border-slate-200/80 flex flex-col space-y-3 min-w-[260px]"
                >
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold font-sora uppercase text-[#142B5C] tracking-wider">
                      {colStatus}
                    </span>
                    <span className="px-2 py-0.5 bg-white rounded-md text-[10px] font-bold border border-slate-200">
                      {colLeads.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold text-[#142B5C]">{lead.name}</h4>
                            <p className="text-[11px] text-slate-500 font-medium">{lead.company || "Particular"}</p>
                          </div>
                          <span className="text-[10px] font-bold text-[#D9A441] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {lead.estimatedBudget || "Consultar"}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          "{lead.message}"
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-mono">{lead.serviceRequested}</span>
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleUpdateStatus(lead.id, e.target.value as LeadItem["status"])
                            }
                            className="text-[10px] bg-slate-100 font-semibold p-1 rounded cursor-pointer border border-slate-200"
                          >
                            <option value="NUEVO">NUEVO</option>
                            <option value="CONTACTADO">CONTACTADO</option>
                            <option value="PRESUPUESTADO">PRESUPUESTADO</option>
                            <option value="GANADO">GANADO</option>
                            <option value="PERDIDO">PERDIDO</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    {colLeads.length === 0 && (
                      <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl">
                        Sin leads en esta columna
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: DETAILED LEADS FEED TABLE */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                  <th className="p-4">Contacto / Empresa</th>
                  <th className="p-4">Servicio Solicitado</th>
                  <th className="p-4">Mensaje / Desafío</th>
                  <th className="p-4 text-center">Estado</th>
                  <th className="p-4 text-right">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#142B5C]">{lead.name}</div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1"><IconMail size={12} /> {lead.email}</span>
                        <span className="flex items-center gap-1"><IconPhone size={12} /> {lead.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#142B5C]">
                      {lead.serviceRequested}
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">
                      {lead.message}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          lead.status === "NUEVO"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : lead.status === "GANADO"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono text-slate-400 text-[11px]">
                      {lead.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: CLIENT PROJECTS MANAGEMENT */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">CÓDIGO: {proj.code}</span>
                    <h3 className="text-base font-bold text-[#142B5C]">{proj.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{proj.clientName}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-[#142B5C] border border-blue-200">
                    ETAPA: {proj.stage}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Avance actual:</span>
                    <span className="text-[#142B5C]">{proj.progressPct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#142B5C] h-full rounded-full transition-all"
                      style={{ width: `${proj.progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>Entrega proyectada: <strong className="text-[#142B5C]">{proj.targetDate}</strong></span>
                  <a
                    href="http://localhost:3000/portal"
                    target="_blank"
                    className="text-[#142B5C] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Ver en Portal</span>
                    <IconArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
