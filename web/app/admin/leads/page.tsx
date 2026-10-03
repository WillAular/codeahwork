"use client";

import * as React from "react";
import { apiRequest } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconInbox,
  IconSearch,
  IconFilter,
  IconCheck,
  IconTrash,
  IconX,
  IconMessage,
  IconBuildingStore,
  IconMail,
  IconPhone,
  IconArrowRight,
  IconRefresh,
} from "@tabler/icons-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("TODOS");
  const [selectedLead, setSelectedLead] = React.useState<any | null>(null);
  const [updatingStatus, setUpdatingStatus] = React.useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("/leads");
      if (Array.isArray(res)) {
        setLeads(res);
      }
    } catch (err) {
      console.error("Error loading leads:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (leadId: number, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      await apiRequest(`/leads/${leadId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err: any) {
      alert("Error al actualizar estado: " + err.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    if (!confirm("¿Estás seguro de eliminar este prospecto?")) return;
    try {
      await apiRequest(`/leads/${leadId}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
    } catch (err: any) {
      alert("Error al eliminar prospecto: " + err.message);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.serviceRequested?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "TODOS" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { key: "NUEVO", label: "Nuevo", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    { key: "CONTACTADO", label: "Contactado", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
    { key: "EN_PROPUESTA", label: "En Propuesta", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { key: "GANADO", label: "Ganado / Proyecto", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    { key: "PERDIDO", label: "Perdido", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-sora font-extrabold text-white">
            Gestión de Prospectos / Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Administrá las consultas enviadas por potenciales clientes desde la web.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchLeads}
          className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
        >
          <IconRefresh size={16} className={`mr-1.5 ${loading ? "animate-spin" : ""}`} />
          Actualizar Lista
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <Input
            placeholder="Buscar por nombre, empresa, email o servicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-slate-950/80 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-mono text-slate-500 uppercase shrink-0">Filtrar:</span>
          <button
            onClick={() => setStatusFilter("TODOS")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              statusFilter === "TODOS"
                ? "bg-amber-400 text-slate-950 font-bold"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            Todos ({leads.length})
          </button>
          {statusOptions.map((st) => {
            const count = leads.filter((l) => l.status === st.key).length;
            return (
              <button
                key={st.key}
                onClick={() => setStatusFilter(st.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  statusFilter === st.key
                    ? "bg-amber-400 text-slate-950 font-bold"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                {st.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500 font-mono">
            Cargando lista de prospectos...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-2">
            <IconInbox size={40} className="mx-auto opacity-40" />
            <p className="text-sm font-medium">No se encontraron prospectos.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] font-mono">
                <tr>
                  <th className="py-4 px-6">Prospecto</th>
                  <th className="py-4 px-6">Contacto</th>
                  <th className="py-4 px-6">Servicio Requerido</th>
                  <th className="py-4 px-6">Estado</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredLeads.map((lead) => {
                  const statusInfo =
                    statusOptions.find((s) => s.key === lead.status) || {
                      color: "bg-slate-800 text-slate-400 border-slate-700",
                      label: lead.status,
                    };

                  return (
                    <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-sora font-bold text-white text-sm">
                          {lead.name}
                        </div>
                        {lead.company && (
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <IconBuildingStore size={13} className="text-slate-500" />
                            <span>{lead.company}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <IconMail size={14} className="text-amber-400" />
                          <span>{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <IconPhone size={13} className="text-slate-500" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-medium text-slate-200">
                          {lead.serviceRequested || "General"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedLead(lead)}
                            className="border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800 text-xs"
                          >
                            Ver Mensaje
                          </Button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10"
                            title="Eliminar Lead"
                          >
                            <IconTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal / Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <IconX size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Detalle de Prospecto #{selectedLead.id}
              </span>
              <h2 className="text-2xl font-sora font-extrabold text-white">
                {selectedLead.name}
              </h2>
              {selectedLead.company && (
                <p className="text-xs text-slate-400 font-medium">
                  Empresa: {selectedLead.company}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Email</span>
                <span className="font-semibold text-slate-200">{selectedLead.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Teléfono</span>
                <span className="font-semibold text-slate-200">{selectedLead.phone || "No especificado"}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Servicio Solicitado</span>
                <span className="font-semibold text-amber-400">{selectedLead.serviceRequested}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Origen</span>
                <span className="font-semibold text-slate-300">{selectedLead.source || "Formulario Web"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <IconMessage size={16} className="text-amber-400" />
                <span>Mensaje / Desafío principal:</span>
              </label>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedLead.message || "Sin mensaje."}
              </div>
            </div>

            {/* Change Status Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Cambiar Estado del Prospecto:
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((st) => (
                  <button
                    key={st.key}
                    disabled={updatingStatus}
                    onClick={() => handleUpdateStatus(selectedLead.id, st.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedLead.status === st.key
                        ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedLead(null)}
                className="border-slate-800 text-slate-400"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
