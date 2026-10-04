"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  IconArrowLeft,
  IconInbox,
  IconBuildingStore,
  IconMail,
  IconPhone,
  IconBrandWhatsapp,
  IconCalendar,
  IconClock,
  IconCheck,
  IconX,
  IconTrash,
  IconMessage,
  IconSparkles,
  IconCopy,
  IconBriefcase,
  IconShare,
  IconPlus,
  IconUser,
  IconExternalLink,
  IconNotes,
  IconPhoneCall,
  IconUsers,
  IconSend,
  IconRocket,
  IconChecklist,
} from "@tabler/icons-react";

interface LeadNote {
  id: string;
  type: "call" | "meeting" | "proposal" | "note";
  content: string;
  author: string;
  createdAt: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LeadDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const leadId = resolvedParams.id;

  const [lead, setLead] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [updatingStatus, setUpdatingStatus] = React.useState(false);
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  // Notes state
  const [notes, setNotes] = React.useState<LeadNote[]>([]);
  const [newNoteText, setNewNoteText] = React.useState("");
  const [newNoteType, setNewNoteType] = React.useState<"call" | "meeting" | "proposal" | "note">("note");

  // Phase 3: Convert to Project Modal state
  const [convertModalOpen, setConvertModalOpen] = React.useState(false);
  const [submittingProject, setSubmittingProject] = React.useState(false);
  const [createdProject, setCreatedProject] = React.useState<any | null>(null);
  const [projectTitle, setProjectTitle] = React.useState("");
  const [projectClient, setProjectClient] = React.useState("");
  const [projectCode, setProjectCode] = React.useState("");
  const [projectStage, setProjectStage] = React.useState("RELEVAMIENTO");
  const [projectProgress, setProjectProgress] = React.useState(10);
  const [projectDesc, setProjectDesc] = React.useState("");

  // Phase 3: WhatsApp Outreach Templates Modal state
  const [whatsappModalOpen, setWhatsappModalOpen] = React.useState(false);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = React.useState(0);
  const [customWhatsappMessage, setCustomWhatsappMessage] = React.useState("");

  // Phase 3: Email Outreach Modal state
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = React.useState(0);

  const fetchLead = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest(`/leads/${leadId}`);
      if (res && res.id) {
        setLead(res);
        // Pre-populate conversion form
        setProjectTitle(`Sistema para ${res.company || res.name}`);
        setProjectClient(res.name);
        setProjectCode(`CDH-2026-${String(res.id).padStart(3, "0")}`);
        setProjectDesc(`Requerimiento de ${res.serviceRequested}: ${res.message || ""}`);
      }
    } catch (err) {
      console.error("Error loading lead:", err);
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  React.useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  // Load notes from localStorage
  React.useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(`codeah_lead_notes_${leadId}`);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch {
      // ignore
    }
  }, [leadId]);

  // Save notes to localStorage
  const saveNotes = (updated: LeadNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem(`codeah_lead_notes_${leadId}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: LeadNote = {
      id: Date.now().toString(),
      type: newNoteType,
      content: newNoteText.trim(),
      author: "Admin Codeah",
      createdAt: new Date().toISOString(),
    };

    saveNotes([newNote, ...notes]);
    setNewNoteText("");
  };

  const handleDeleteNote = (noteId: string) => {
    const updated = notes.filter((n) => n.id !== noteId);
    saveNotes(updated);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!lead) return;
    setUpdatingStatus(true);
    try {
      await apiRequest(`/leads/${lead.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setLead((prev: any) => ({ ...prev, status: newStatus }));

      // Automatically add a system note
      const systemNote: LeadNote = {
        id: Date.now().toString(),
        type: "note",
        content: `Estado actualizado a "${newStatus.replace("_", " ")}"`,
        author: "Sistema",
        createdAt: new Date().toISOString(),
      };
      saveNotes([systemNote, ...notes]);

      // If marked as GANADO, offer to convert to project
      if (newStatus === "GANADO" && !createdProject) {
        setConvertModalOpen(true);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!lead) return;
    if (!window.confirm("¿Seguro que deseas eliminar este prospecto? Esta acción no se puede deshacer.")) return;
    try {
      await apiRequest(`/leads/${lead.id}`, { method: "DELETE" });
      router.push("/admin/leads");
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Phase 3: Convert Lead directly to Active Project
  const handleCreateProjectFromLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !lead) return;

    setSubmittingProject(true);
    try {
      const payload = {
        name: projectTitle,
        title: projectTitle,
        clientName: projectClient,
        description: projectDesc,
        stage: projectStage,
        progressPct: Number(projectProgress),
        code: projectCode,
        milestones: [
          { id: 1, title: "Reunión de relevamiento & Mapa de Procesos", isCompleted: true },
          { id: 2, title: "Prototipo interactivo navegable (Figma UI)", isCompleted: projectProgress >= 50 },
          { id: 3, title: "Desarrollo de módulos e integración AFIP WebService", isCompleted: projectProgress >= 75 },
          { id: 4, title: "Pruebas de estrés & Capacitación del equipo", isCompleted: projectProgress === 100 },
        ],
      };

      const res = await apiRequest("/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res && res.id) {
        setCreatedProject(res);

        // Update lead status to GANADO
        await apiRequest(`/leads/${lead.id}/status`, {
          method: "PATCH",
          body: JSON.stringify({ status: "GANADO" }),
        });
        setLead((prev: any) => ({ ...prev, status: "GANADO" }));

        // Log to activity timeline
        const projectLogNote: LeadNote = {
          id: Date.now().toString(),
          type: "proposal",
          content: `🎉 Lead convertido exitosamente a Proyecto activo: "${res.title || res.name}" (Código: ${res.code || projectCode}).`,
          author: "Sistema CRM",
          createdAt: new Date().toISOString(),
        };
        saveNotes([projectLogNote, ...notes]);
      }
    } catch (err) {
      console.error("Error converting lead to project:", err);
    } finally {
      setSubmittingProject(false);
    }
  };

  // Phase 3: Smart WhatsApp Templates
  const whatsappTemplates = React.useMemo(() => {
    if (!lead) return [];
    return [
      {
        id: "saludo",
        title: "01. Primer Contacto & Saludo",
        description: "Ideal para responder de inmediato tras recibir el formulario.",
        text: `Hola ${lead.name}, te escribo del equipo de Codeah en respuesta a tu consulta sobre ${lead.serviceRequested} a través de nuestra web. ¿En qué horario te resultaría cómodo que coordinemos una breve llamada para conocer en detalle los requerimientos?`,
      },
      {
        id: "demo",
        title: "02. Coordinar Reunión de Relevamiento",
        description: "Para agendar videollamada y analizar procesos.",
        text: `Hola ${lead.name}, estuvimos analizando los requerimientos de ${lead.serviceRequested} para ${lead.company || "tu proyecto"}. Nos gustaría coordinar una videollamada de 20 minutos para definir el alcance técnico y roadmap. ¿Te queda bien mañana por la mañana o por la tarde?`,
      },
      {
        id: "propuesta",
        title: "03. Presupuesto & Propuesta Técnica",
        description: "Avisar que la propuesta formal ya fue enviada por email.",
        text: `Hola ${lead.name}, ¡buenas noticias! Ya tenemos lista la propuesta técnica y estimación para el desarrollo de ${lead.serviceRequested}. Te la acabamos de enviar a ${lead.email}. Quedamos a total disposición para revisar cualquier duda sobre los módulos.`,
      },
      {
        id: "seguimiento",
        title: "04. Seguimiento Comercial / Check-in",
        description: "Reactivar la conversación tras enviar la propuesta.",
        text: `Hola ${lead.name}, ¿cómo estás? Te escribo para consultar si pudieron revisar la propuesta que les preparamos desde Codeah o si precisan que ajustemos alguna etapa del alcance.`,
      },
    ];
  }, [lead]);

  // Update custom WhatsApp message when template changes
  React.useEffect(() => {
    if (whatsappTemplates[selectedTemplateIndex]) {
      setCustomWhatsappMessage(whatsappTemplates[selectedTemplateIndex].text);
    }
  }, [selectedTemplateIndex, whatsappTemplates]);

  // Phase 3: Trigger WhatsApp and log activity
  const handleSendWhatsapp = () => {
    if (!lead || !lead.phone) return;
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone) return;

    const encoded = encodeURIComponent(customWhatsappMessage);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;

    // Open WhatsApp Web
    window.open(url, "_blank");

    // Automatically record activity in timeline
    const templateName = whatsappTemplates[selectedTemplateIndex]?.title || "Mensaje personalizado";
    const waNote: LeadNote = {
      id: Date.now().toString(),
      type: "call",
      content: `💬 Contactado por WhatsApp (${templateName}):\n"${customWhatsappMessage}"`,
      author: "Admin Codeah",
      createdAt: new Date().toISOString(),
    };
    saveNotes([waNote, ...notes]);
    setWhatsappModalOpen(false);
  };

  // Phase 3: Email templates
  const emailTemplates = React.useMemo(() => {
    if (!lead) return [];
    return [
      {
        title: "Confirmación de Recepción & Agendar Relevamiento",
        subject: `Codeah | Consulta sobre ${lead.serviceRequested} - ${lead.company || lead.name}`,
        body: `Hola ${lead.name},\n\nGracias por comunicarte con Codeah. Recibimos tu consulta sobre ${lead.serviceRequested} y queremos coordinar una reunión de relevamiento para conocer los procesos actuales de tu empresa.\n\n¿Qué día y horario te quedaría más cómodo esta semana?\n\nSaludos cordiales,\nEquipo Codeah\nhttps://codeah.app`,
      },
      {
        title: "Envío de Cotización & Alcance Técnico",
        subject: `Propuesta Técnica & Presupuesto | ${lead.serviceRequested} - Codeah`,
        body: `Estimado/a ${lead.name},\n\nAdjuntamos la propuesta técnica y estimación de desarrollo para el proyecto de ${lead.serviceRequested}.\n\nQuedamos a tu entera disposición para coordinar una llamada y despejar cualquier duda.\n\nSaludos,\nEquipo Codeah`,
      },
    ];
  }, [lead]);

  const handleSendEmail = () => {
    if (!lead) return;
    const tmpl = emailTemplates[selectedEmailTemplate];
    const mailto = `mailto:${lead.email}?subject=${encodeURIComponent(tmpl.subject)}&body=${encodeURIComponent(tmpl.body)}`;
    window.location.href = mailto;

    // Log to timeline
    const mailNote: LeadNote = {
      id: Date.now().toString(),
      type: "proposal",
      content: `✉️ Enviado email de seguimiento (${tmpl.title}) a ${lead.email}.`,
      author: "Admin Codeah",
      createdAt: new Date().toISOString(),
    };
    saveNotes([mailNote, ...notes]);
    setEmailModalOpen(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Reciente";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const formatNoteDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const statusOptions = [
    { key: "NUEVO", label: "Nuevo", step: 1 },
    { key: "CONTACTADO", label: "Contactado", step: 2 },
    { key: "PROPUESTA_ENVIADA", label: "Propuesta Enviada", step: 3 },
    { key: "GANADO", label: "Ganado / Proyecto", step: 4 },
  ];

  if (loading) {
    return (
      <div className="py-24 text-center text-xs text-slate-500 font-mono space-y-3">
        <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Cargando información del prospecto #{leadId}...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <IconInbox size={32} />
        </div>
        <h2 className="text-xl font-sora font-extrabold text-slate-900 dark:text-white">
          Prospecto no encontrado
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          El prospecto #{leadId} no existe o fue eliminado previamente.
        </p>
        <Link href="/admin/leads">
          <Button variant="outline" size="sm" className="mt-2 border-slate-300 dark:border-slate-800">
            <IconArrowLeft size={16} className="mr-1.5" />
            Volver a la lista de Prospectos
          </Button>
        </Link>
      </div>
    );
  }

  const hasPhone = Boolean(lead.phone && lead.phone !== "No especificado");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Volver a lista"
          >
            <IconArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Link href="/admin/leads" className="hover:underline">
                Prospectos
              </Link>
              <span>/</span>
              <span className="text-amber-500 font-bold">Ficha #{lead.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-sora font-extrabold text-slate-900 dark:text-white mt-0.5">
              {lead.name} {lead.company ? `• ${lead.company}` : ""}
            </h1>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          {hasPhone && (
            <button
              onClick={() => setWhatsappModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold hover:bg-emerald-500/20 transition-all shadow-xs cursor-pointer"
            >
              <IconBrandWhatsapp size={16} />
              <span>Plantillas WhatsApp</span>
            </button>
          )}

          <button
            onClick={() => setEmailModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <IconMail size={16} />
            <span className="hidden sm:inline">Plantillas Email</span>
          </button>

          <Button
            variant="gold"
            size="sm"
            onClick={() => setConvertModalOpen(true)}
            className="font-bold flex items-center gap-1.5 shadow-sm"
          >
            <IconRocket size={16} />
            <span>Convertir a Proyecto</span>
          </Button>

          <button
            onClick={handleDeleteLead}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/10"
            title="Eliminar prospecto"
          >
            <IconTrash size={16} />
          </button>
        </div>
      </div>

      {/* Visual Pipeline Stepper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <IconSparkles size={16} className="text-amber-500" />
            <span>Etapa del Pipeline de Venta:</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={updatingStatus}
              onClick={() => handleUpdateStatus("PERDIDO")}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                lead.status === "PERDIDO"
                  ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
              }`}
            >
              Marcar como Perdido
            </button>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {statusOptions.map((st, idx) => {
            const isActive = lead.status === st.key;
            const isCompleted =
              st.key === "NUEVO" ||
              (st.key === "CONTACTADO" && (lead.status === "CONTACTADO" || lead.status === "PROPUESTA_ENVIADA" || lead.status === "GANADO")) ||
              (st.key === "PROPUESTA_ENVIADA" && (lead.status === "PROPUESTA_ENVIADA" || lead.status === "GANADO")) ||
              (st.key === "GANADO" && lead.status === "GANADO");

            return (
              <button
                key={st.key}
                disabled={updatingStatus}
                onClick={() => handleUpdateStatus(st.key)}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  isActive
                    ? "bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/15"
                    : isCompleted
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                  <span>Paso 0{idx + 1}</span>
                  {isActive && <IconCheck size={14} />}
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate">
                  {st.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Column (35%) & Right Column (65%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Client Data & Details (4 / 12) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Profile & Contact Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-lg">
                {lead.name ? lead.name.charAt(0).toUpperCase() : "L"}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-sora font-extrabold text-base text-slate-900 dark:text-white truncate">
                  {lead.name}
                </h3>
                {lead.company ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <IconBuildingStore size={13} className="shrink-0" />
                    <span className="truncate">{lead.company}</span>
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">Particular / Emprendedor</p>
                )}
              </div>
            </div>

            {/* Contact Rows */}
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] block mb-0.5">
                  Correo Electrónico
                </span>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <a
                    href={`mailto:${lead.email}`}
                    className="font-medium text-slate-800 dark:text-slate-200 hover:text-amber-500 truncate"
                  >
                    {lead.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(lead.email, "email")}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0"
                    title="Copiar email"
                  >
                    {copiedField === "email" ? (
                      <span className="text-[10px] text-emerald-500 font-bold">Copiado</span>
                    ) : (
                      <IconCopy size={14} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] block mb-0.5">
                  Teléfono / WhatsApp
                </span>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {lead.phone || "No especificado"}
                  </span>
                  {hasPhone && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => copyToClipboard(lead.phone, "phone")}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        title="Copiar teléfono"
                      >
                        {copiedField === "phone" ? (
                          <span className="text-[10px] text-emerald-500 font-bold">Copiado</span>
                        ) : (
                          <IconCopy size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => setWhatsappModalOpen(true)}
                        className="text-emerald-500 hover:text-emerald-400"
                        title="Abrir plantillas de WhatsApp"
                      >
                        <IconBrandWhatsapp size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] block mb-0.5">
                  Servicio Solicitado
                </span>
                <p className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                  {lead.serviceRequested}
                </p>
              </div>

              {lead.estimatedBudget && (
                <div>
                  <span className="text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px] block mb-0.5">
                    Presupuesto Estimado
                  </span>
                  <p className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {lead.estimatedBudget}
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 space-y-1 font-mono">
                <p>Canal de Origen: <span className="font-semibold text-slate-700 dark:text-slate-300">{lead.source}</span></p>
                <p>Fecha de Ingreso: <span className="font-semibold text-slate-700 dark:text-slate-300">{formatDate(lead.createdAt)}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Message & CRM Activity / Notes (8 / 12) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: Original Message */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-sora font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <IconMessage size={16} className="text-amber-500" />
                <span>Mensaje / Desafío Planteado por el Cliente</span>
              </h3>
              <button
                onClick={() => copyToClipboard(lead.message, "message")}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
              >
                {copiedField === "message" ? (
                  <span className="text-emerald-500 font-bold">Copiado</span>
                ) : (
                  <>
                    <IconCopy size={14} />
                    <span>Copiar mensaje</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans">
              {lead.message || "Sin mensaje proporcionado."}
            </div>
          </div>

          {/* Card: CRM Activity & Internal Notes Log */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sora font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <IconNotes size={18} className="text-amber-500" />
                  <span>Bitácora de Seguimiento & Notas Internas</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Registrá llamadas, acuerdos, notas de reuniones y tareas para este prospecto.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                {notes.length} {notes.length === 1 ? "registro" : "registros"}
              </span>
            </div>

            {/* New Note Form */}
            <form onSubmit={handleAddNote} className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Tipo:</span>
                {[
                  { key: "note", label: "Nota interna", icon: IconNotes },
                  { key: "call", label: "Llamada", icon: IconPhoneCall },
                  { key: "meeting", label: "Reunión", icon: IconUsers },
                  { key: "proposal", label: "Propuesta", icon: IconBriefcase },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setNewNoteType(t.key as any)}
                    className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors border ${
                      newNoteType === t.key
                        ? "bg-amber-400 text-slate-950 border-amber-400 font-bold"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <t.icon size={13} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <Textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Ej: Se acordó llamada para el martes 15:00 hs para revisar alcance del WebService AFIP..."
                  rows={3}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs sm:text-sm"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  variant="gold"
                  disabled={!newNoteText.trim()}
                  className="font-bold flex items-center gap-1.5"
                >
                  <IconSend size={15} />
                  <span>Guardar Nota en Bitácora</span>
                </Button>
              </div>
            </form>

            {/* Notes Timeline List */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              {notes.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 space-y-1">
                  <IconNotes size={24} className="mx-auto opacity-30" />
                  <p>Aún no hay notas registradas para este prospecto.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notes.map((n) => {
                    const badgeStyles = {
                      call: "text-sky-500 bg-sky-500/10 border-sky-500/20",
                      meeting: "text-purple-500 bg-purple-500/10 border-purple-500/20",
                      proposal: "text-amber-500 bg-amber-500/10 border-amber-500/20",
                      note: "text-slate-500 bg-slate-500/10 border-slate-500/20",
                    }[n.type];

                    const typeLabel = {
                      call: "Llamada",
                      meeting: "Reunión",
                      proposal: "Propuesta",
                      note: "Nota",
                    }[n.type];

                    return (
                      <div
                        key={n.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2 group"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyles}`}>
                              {typeLabel}
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {n.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400 font-mono">
                              {formatNoteDate(n.createdAt)}
                            </span>
                            <button
                              onClick={() => handleDeleteNote(n.id)}
                              className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Eliminar nota"
                            >
                              <IconX size={14} />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                          {n.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Phase 3 Convert to Project Direct Flow */}
      {convertModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setConvertModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <IconX size={20} />
            </button>

            {createdProject ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <IconCheck size={36} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-sora font-extrabold text-slate-900 dark:text-white">
                    ¡Proyecto Creado con Éxito!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    El prospecto fue marcado automáticamente como <strong>GANADO</strong> y el proyecto ya está listo en el módulo de Proyectos & Hitos.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-left space-y-1.5 font-mono">
                  <p><span className="text-slate-400">Título:</span> <strong className="text-slate-900 dark:text-white">{createdProject.title}</strong></p>
                  <p><span className="text-slate-400">Código:</span> <strong className="text-amber-500">{createdProject.code}</strong></p>
                  <p><span className="text-slate-400">Etapa inicial:</span> <strong className="text-sky-500">{createdProject.stage}</strong></p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCreatedProject(null);
                      setConvertModalOpen(false);
                    }}
                    className="border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    Seguir en esta Ficha
                  </Button>
                  <Link href="/admin/projects">
                    <Button variant="gold" size="sm" className="font-bold flex items-center gap-1.5">
                      <span>Ir a Proyectos & Hitos</span>
                      <IconExternalLink size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                    <IconRocket size={14} />
                    <span>Handover Comercial ➔ Operativo</span>
                  </span>
                  <h2 className="text-2xl font-sora font-extrabold text-slate-900 dark:text-white">
                    Convertir Prospecto a Proyecto
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Da de alta el desarrollo y vincula el requerimiento para comenzar la etapa técnica.
                  </p>
                </div>

                <form onSubmit={handleCreateProjectFromLead} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Nombre / Título del Proyecto *
                    </label>
                    <Input
                      required
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="Ej: Sistema Integral de Facturación AFIP"
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Cliente Asignado
                      </label>
                      <Input
                        required
                        value={projectClient}
                        onChange={(e) => setProjectClient(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Código de Seguimiento
                      </label>
                      <Input
                        required
                        value={projectCode}
                        onChange={(e) => setProjectCode(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Etapa Inicial
                      </label>
                      <select
                        value={projectStage}
                        onChange={(e) => setProjectStage(e.target.value)}
                        className="flex h-12 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      >
                        <option value="RELEVAMIENTO">01. Relevamiento</option>
                        <option value="DISENO">02. Diseño UI/UX</option>
                        <option value="DESARROLLO">03. Desarrollo API</option>
                        <option value="PUESTA_EN_MARCHA">04. Puesta en marcha</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        % Avance Inicial ({projectProgress}%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={projectProgress}
                        onChange={(e) => setProjectProgress(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Alcance Técnico / Descripción
                    </label>
                    <Textarea
                      rows={3}
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setConvertModalOpen(false)}
                      className="border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="gold"
                      size="sm"
                      disabled={submittingProject}
                      className="font-bold flex items-center gap-1.5"
                    >
                      <IconCheck size={16} />
                      <span>{submittingProject ? "Creando Proyecto..." : "Confirmar y Crear Proyecto"}</span>
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal: Phase 3 WhatsApp Outreach Templates */}
      {whatsappModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setWhatsappModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <IconX size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
                <IconBrandWhatsapp size={15} />
                <span>WhatsApp Outreach Inteligente</span>
              </span>
              <h2 className="text-2xl font-sora font-extrabold text-slate-900 dark:text-white">
                Contactar a {lead.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecciona una plantilla predeterminada o edita el mensaje antes de abrir WhatsApp Web.
              </p>
            </div>

            {/* Template Selector Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Elegir Plantilla Comercial:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {whatsappTemplates.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTemplateIndex(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedTemplateIndex === idx
                        ? "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{t.title}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-normal">
                      {t.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Preview & Edit */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Vista Previa / Mensaje a Enviar:
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  Destino: {lead.phone}
                </span>
              </div>
              <Textarea
                rows={4}
                value={customWhatsappMessage}
                onChange={(e) => setCustomWhatsappMessage(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWhatsappModalOpen(false)}
                className="border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleSendWhatsapp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <IconBrandWhatsapp size={16} />
                <span>Abrir en WhatsApp Web & Registrar</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Phase 3 Email Outreach Templates */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setEmailModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <IconX size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                <IconMail size={15} />
                <span>Email Outreach</span>
              </span>
              <h2 className="text-2xl font-sora font-extrabold text-slate-900 dark:text-white">
                Enviar Correo a {lead.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecciona la plantilla con el asunto y contenido para abrir tu gestor de correo pre-cargado.
              </p>
            </div>

            <div className="space-y-2">
              {emailTemplates.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedEmailTemplate(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                    selectedEmailTemplate === idx
                      ? "bg-amber-400/15 border-amber-400 text-amber-600 dark:text-amber-400 font-bold"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <p className="text-xs font-bold">{t.title}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                    Asunto: {t.subject}
                  </p>
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed font-sans">
              {emailTemplates[selectedEmailTemplate]?.body}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEmailModalOpen(false)}
                className="border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                variant="gold"
                onClick={handleSendEmail}
                className="font-bold flex items-center gap-1.5"
              >
                <IconMail size={16} />
                <span>Abrir Email & Registrar</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
