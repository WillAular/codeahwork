"use client";

import * as React from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconInbox,
  IconSearch,
  IconBuildingStore,
  IconMail,
  IconPhone,
  IconBrandWhatsapp,
  IconTrash,
  IconX,
  IconMessage,
  IconRefresh,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconArrowsSort,
  IconFilter,
  IconClock,
  IconCheck,
  IconSparkles,
  IconExternalLink,
} from "@tabler/icons-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Filters State
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("TODOS");
  const [serviceFilter, setServiceFilter] = React.useState<string>("TODOS");
  const [sortOrder, setSortOrder] = React.useState<"recent" | "oldest" | "name_asc">("recent");

  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // Modal / Detail State
  const [selectedLead, setSelectedLead] = React.useState<any | null>(null);
  const [updatingStatus, setUpdatingStatus] = React.useState(false);

  // Email Notification Modal State
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [testEmailInput, setTestEmailInput] = React.useState("");
  const [sendingTestEmail, setSendingTestEmail] = React.useState(false);
  const [testResult, setTestResult] = React.useState<{ success: boolean; message: string; details?: any } | null>(null);

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
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingTestEmail(true);
    setTestResult(null);
    try {
      const res = await apiRequest("/leads/test-email", {
        method: "POST",
        body: JSON.stringify({ email: testEmailInput.trim() || undefined }),
      });
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Error al conectar con la API para probar el correo.",
      });
    } finally {
      setSendingTestEmail(false);
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este prospecto?")) return;
    try {
      await apiRequest(`/leads/${leadId}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const statusOptions = [
    { key: "NUEVO", label: "Nuevo", color: "bg-amber-500/15 text-amber-500 border-amber-500/30" },
    { key: "CONTACTADO", label: "Contactado", color: "bg-sky-500/15 text-sky-500 border-sky-500/30" },
    { key: "PROPUESTA_ENVIADA", label: "Propuesta Enviada", color: "bg-indigo-500/15 text-indigo-500 border-indigo-500/30" },
    { key: "GANADO", label: "Ganado / Proyecto", color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" },
    { key: "PERDIDO", label: "Perdido", color: "bg-rose-500/15 text-rose-500 border-rose-500/30" },
  ];

  // Unique services list for dynamic filter
  const uniqueServices = React.useMemo(() => {
    const services = new Set<string>();
    leads.forEach((l) => {
      if (l.serviceRequested) services.add(l.serviceRequested);
    });
    return Array.from(services);
  }, [leads]);

  // Filter & Sort
  const filteredAndSortedLeads = React.useMemo(() => {
    let result = leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "TODOS" || lead.status === statusFilter;
      const matchesService =
        serviceFilter === "TODOS" || lead.serviceRequested === serviceFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        lead.name?.toLowerCase().includes(query) ||
        lead.company?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.phone?.toLowerCase().includes(query) ||
        lead.message?.toLowerCase().includes(query) ||
        lead.serviceRequested?.toLowerCase().includes(query);

      return matchesStatus && matchesService && matchesSearch;
    });

    // Sort
    result.sort((a, b) => {
      if (sortOrder === "recent") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (sortOrder === "oldest") {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }
      if (sortOrder === "name_asc") {
        return (a.name || "").localeCompare(b.name || "");
      }
      return 0;
    });

    return result;
  }, [leads, search, statusFilter, serviceFilter, sortOrder]);

  // Reset pagination to page 1 if filtered results shrink
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, serviceFilter, pageSize]);

  // Pagination calculations
  const totalItems = filteredAndSortedLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedLeads = filteredAndSortedLeads.slice(startIndex, endIndex);

  // Date formatter
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Reciente";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  // WhatsApp Link Helper
  const getWhatsAppLink = (phone?: string, name?: string, service?: string) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) return null;
    const msg = encodeURIComponent(
      `Hola ${name || ""}, te escribimos de Codeah respecto a tu consulta por ${service || "nuestros servicios"}. ¿En qué horario te resultaría cómodo conversar brevemente?`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  // Metrics counts
  const newCount = leads.filter((l) => l.status === "NUEVO").length;
  const inProgressCount = leads.filter(
    (l) => l.status === "CONTACTADO" || l.status === "PROPUESTA_ENVIADA"
  ).length;
  const wonCount = leads.filter((l) => l.status === "GANADO").length;

  const hasActiveFilters =
    search.trim() !== "" || statusFilter !== "TODOS" || serviceFilter !== "TODOS";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("TODOS");
    setServiceFilter("TODOS");
    setSortOrder("recent");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-sora font-extrabold text-slate-900 dark:text-white">
            Gestión de Prospectos / Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Recepción, cualificación y seguimiento comercial de clientes potenciales.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEmailModal(true)}
            className="border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
          >
            <IconMail size={16} className="mr-1.5" />
            Alertas por Email
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads}
            className="border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <IconRefresh size={16} className={`mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Actualizar Lista
          </Button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Prospectos
            </span>
            <p className="text-2xl font-sora font-extrabold text-slate-900 dark:text-white mt-0.5">
              {leads.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <IconInbox size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Nuevos sin contactar
              </span>
              {newCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
            <p className="text-2xl font-sora font-extrabold text-amber-500 mt-0.5">
              {newCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <IconClock size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              En Negociación
            </span>
            <p className="text-2xl font-sora font-extrabold text-sky-500 mt-0.5">
              {inProgressCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <IconSparkles size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ganados / Clientes
            </span>
            <p className="text-2xl font-sora font-extrabold text-emerald-500 mt-0.5">
              {wonCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <IconCheck size={20} />
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-xs">
        {/* Row 1: Search and Status Tabs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <Input
              placeholder="Buscar por prospecto, empresa, email, teléfono o mensaje..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-9 bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus-visible:ring-amber-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <IconX size={16} />
              </button>
            )}
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => setStatusFilter("TODOS")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                statusFilter === "TODOS"
                  ? "bg-amber-400 text-slate-950 font-bold shadow-sm shadow-amber-500/20"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    statusFilter === st.key
                      ? "bg-amber-400 text-slate-950 font-bold shadow-sm shadow-amber-500/20"
                      : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {st.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Secondary Dropdowns (Service, Sort, Page Size & Clear) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Service filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Servicio:</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              >
                <option value="TODOS">Todos los servicios ({leads.length})</option>
                {uniqueServices.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort order */}
            <div className="flex items-center gap-1.5">
              <IconArrowsSort size={15} className="text-slate-400" />
              <span className="font-semibold text-slate-500 dark:text-slate-400">Ordenar:</span>
              <select
                value={sortOrder}
                onChange={(e: any) => setSortOrder(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              >
                <option value="recent">Más recientes primero</option>
                <option value="oldest">Más antiguos primero</option>
                <option value="name_asc">Nombre de contacto (A-Z)</option>
              </select>
            </div>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 font-medium transition-colors"
              >
                <IconX size={14} />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>

          {/* Items per page selector */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-slate-500 dark:text-slate-400">Mostrar:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="h-9 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
            >
              <option value={5}>5 por pág.</option>
              <option value={10}>10 por pág.</option>
              <option value={20}>20 por pág.</option>
              <option value={50}>50 por pág.</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs dark:shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500 font-mono space-y-3">
            <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Cargando lista de prospectos...</p>
          </div>
        ) : filteredAndSortedLeads.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <IconInbox size={44} className="mx-auto opacity-40 text-amber-500" />
            <div className="space-y-1">
              <p className="text-base font-sora font-bold text-slate-800 dark:text-slate-200">
                No se encontraron prospectos
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {hasActiveFilters
                  ? "Probá ajustando o quitando los filtros de búsqueda aplicados."
                  : "Aún no hay consultas registradas a través del formulario de la web."}
              </p>
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-2 text-xs border-slate-300 dark:border-slate-700"
              >
                Restablecer Filtros
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px] font-mono">
                <tr>
                  <th className="py-4 px-6">Prospecto</th>
                  <th className="py-4 px-6">Contacto Directo</th>
                  <th className="py-4 px-6">Servicio Requerido</th>
                  <th className="py-4 px-6">Estado</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {paginatedLeads.map((lead) => {
                  const statusInfo =
                    statusOptions.find((s) => s.key === lead.status) || {
                      color: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700",
                      label: lead.status,
                    };

                  const waLink = getWhatsAppLink(lead.phone, lead.name, lead.serviceRequested);

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Lead Name, Company & Date */}
                      <td className="py-4 px-6">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="font-sora font-bold text-slate-900 dark:text-white text-sm hover:text-amber-500 transition-colors inline-block"
                        >
                          {lead.name}
                        </Link>
                        {lead.company && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <IconBuildingStore size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
                            <span className="truncate max-w-[200px]">{lead.company}</span>
                          </div>
                        )}
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1 font-mono">
                          <IconCalendar size={12} className="shrink-0" />
                          <span>{formatDate(lead.createdAt)}</span>
                        </div>
                      </td>

                      {/* Contact Info with Direct WhatsApp */}
                      <td className="py-4 px-6 space-y-1">
                        <a
                          href={`mailto:${lead.email}?subject=Consulta%20Codeah`}
                          className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors"
                        >
                          <IconMail size={14} className="text-amber-500 shrink-0" />
                          <span className="truncate max-w-[180px]">{lead.email}</span>
                        </a>

                        {lead.phone && lead.phone !== "No especificado" && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <IconPhone size={13} className="text-slate-400 shrink-0" />
                              <span>{lead.phone}</span>
                            </span>

                            {waLink && (
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-semibold transition-colors"
                                title="Abrir WhatsApp Web con mensaje de contacto"
                              >
                                <IconBrandWhatsapp size={13} />
                                <span>WhatsApp</span>
                              </a>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Service & Budget */}
                      <td className="py-4 px-6">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                          {lead.serviceRequested || "General"}
                        </span>
                        {lead.estimatedBudget && (
                          <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 block mt-0.5">
                            Presupuesto: {lead.estimatedBudget}
                          </span>
                        )}
                      </td>

                      {/* Status Selector Dropdown */}
                      <td className="py-4 px-6">
                        <select
                          value={lead.status}
                          disabled={updatingStatus}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full border cursor-pointer focus-visible:outline-none transition-colors ${statusInfo.color} bg-white dark:bg-slate-900`}
                        >
                          {statusOptions.map((st) => (
                            <option key={st.key} value={st.key} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/leads/${lead.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
                            >
                              <span>Ver Ficha</span>
                              <IconExternalLink size={13} />
                            </Button>
                          </Link>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10"
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

        {/* Pagination Footer */}
        {!loading && totalItems > 0 && (
          <div className="p-4 sm:px-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            {/* Range info */}
            <div className="text-slate-500 dark:text-slate-400">
              Mostrando <span className="font-bold text-slate-800 dark:text-slate-200">{startIndex + 1}</span> a{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">{endIndex}</span> de{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">{totalItems}</span> prospectos
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              {/* First Page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={safeCurrentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Primera página"
              >
                <IconChevronsLeft size={16} />
              </button>

              {/* Prev Page */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Página anterior"
              >
                <IconChevronLeft size={16} />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    // Show current, first, last, and immediate neighbors
                    return (
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - safeCurrentPage) <= 1
                    );
                  })
                  .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showEllipsis = prev && p - prev > 1;

                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && (
                          <span className="px-1 text-slate-400">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(p)}
                          className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${
                            safeCurrentPage === p
                              ? "bg-amber-400 text-slate-950 shadow-sm"
                              : "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              {/* Next Page */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Página siguiente"
              >
                <IconChevronRight size={16} />
              </button>

              {/* Last Page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={safeCurrentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Última página"
              >
                <IconChevronsRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <IconX size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                Ficha de Prospecto #{selectedLead.id}
              </span>
              <h2 className="text-2xl font-sora font-extrabold text-slate-900 dark:text-white">
                {selectedLead.name}
              </h2>
              {selectedLead.company && (
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Empresa: {selectedLead.company}
                </p>
              )}
            </div>

            {/* Direct Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {getWhatsAppLink(selectedLead.phone, selectedLead.name, selectedLead.serviceRequested) && (
                <a
                  href={getWhatsAppLink(selectedLead.phone, selectedLead.name, selectedLead.serviceRequested)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
                >
                  <IconBrandWhatsapp size={16} />
                  <span>Contactar por WhatsApp</span>
                </a>
              )}
              <a
                href={`mailto:${selectedLead.email}?subject=Consulta%20Codeah`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <IconMail size={16} />
                <span>Enviar Email</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Email</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLead.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Teléfono</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLead.phone || "No especificado"}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Servicio Solicitado</span>
                <span className="font-semibold text-amber-500">{selectedLead.serviceRequested}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Fecha de Ingreso</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{formatDate(selectedLead.createdAt)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <IconMessage size={16} className="text-amber-500" />
                <span>Mensaje / Desafío principal:</span>
              </label>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedLead.message || "Sin mensaje."}
              </div>
            </div>

            {/* Change Status Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
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
                        : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800"
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
                className="border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Email Notification Test & Setup Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <IconMail size={22} />
                </div>
                <div>
                  <h3 className="font-sora font-extrabold text-lg text-slate-900 dark:text-white">
                    Alertas por Email (Gmail / SMTP)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Notificaciones en tiempo real cada vez que un cliente solicita contacto.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setTestResult(null);
                }}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <IconX size={20} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <IconSparkles size={15} className="text-amber-500" />
                  <span>Configuración en <code className="text-amber-500 font-mono">api/.env</code>:</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  Para tu cuenta Gmail, genera una contraseña de 16 letras en{" "}
                  <a
                    href="https://myaccount.google.com/apppasswords"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-500 hover:underline font-semibold"
                  >
                    Google App Passwords ↗
                  </a>
                </p>
                <div className="bg-slate-900 text-slate-300 p-2.5 rounded-xl font-mono text-[11px] space-y-1">
                  <div>SMTP_HOST=smtp.gmail.com</div>
                  <div>SMTP_PORT=465</div>
                  <div>SMTP_SECURE=true</div>
                  <div className="text-amber-400">SMTP_USER=tu_correo@gmail.com</div>
                  <div className="text-amber-400">SMTP_PASS=tu_clave_de_16_caracteres</div>
                  <div>NOTIFICATION_EMAIL_TO=donde_recibir_alertas@gmail.com</div>
                </div>
              </div>

              {/* Test Sender Form */}
              <form onSubmit={handleTestEmail} className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Probar Envío a este Correo (opcional):
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="ejemplo@gmail.com (dejar vacío para usar NOTIFICATION_EMAIL_TO)"
                      value={testEmailInput}
                      onChange={(e) => setTestEmailInput(e.target.value)}
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200"
                    />
                    <Button
                      type="submit"
                      disabled={sendingTestEmail}
                      size="sm"
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0 text-xs"
                    >
                      {sendingTestEmail ? (
                        <>
                          <IconRefresh size={14} className="animate-spin mr-1.5" />
                          Probando...
                        </>
                      ) : (
                        "Enviar Prueba"
                      )}
                    </Button>
                  </div>
                </div>
              </form>

              {/* Test Result Message */}
              {testResult && (
                <div
                  className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-in fade-in ${
                    testResult.success
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {testResult.success ? "✅ ¡Verificación Exitosa!" : "⚠️ Resultado de la Verificación:"}
                  </div>
                  <div>{testResult.message}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowEmailModal(false);
                  setTestResult(null);
                }}
                className="border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs"
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
