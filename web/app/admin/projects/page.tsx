"use client";

import * as React from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  IconBriefcase,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconClock,
  IconExternalLink,
  IconRefresh,
  IconX,
  IconUser,
  IconBuildingStore,
  IconSparkles,
} from "@tabler/icons-react";

export default function AdminProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = React.useState<any[]>([]);
  const [usersList, setUsersList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<any | null>(null);

  // Form states
  const [newTitle, setNewTitle] = React.useState("");
  const [newClientName, setNewClientName] = React.useState("");
  const [newCode, setNewCode] = React.useState("CDH-2026-002");
  const [newDescription, setNewDescription] = React.useState("");
  const [newStage, setNewStage] = React.useState("DESARROLLO");
  const [newProgress, setNewProgress] = React.useState(50);
  const [submitting, setSubmitting] = React.useState(false);

  const fetchProjectsAndUsers = async () => {
    setLoading(true);
    try {
      const [projRes, usersRes] = await Promise.allSettled([
        apiRequest("/projects"),
        apiRequest("/users"),
      ]);

      if (projRes.status === "fulfilled" && Array.isArray(projRes.value)) {
        setProjects(projRes.value);
      }
      if (usersRes.status === "fulfilled" && Array.isArray(usersRes.value)) {
        setUsersList(usersRes.value);
      }
    } catch (err) {
      console.error("Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProjectsAndUsers();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Find current user id or first admin
      const managerId = user?.id || 1;
      const payload = {
        title: newTitle,
        description: `${newClientName ? `Cliente: ${newClientName} | ` : ""}${newDescription}`,
        managerId,
        status: "EN_PROGRESO",
      };

      const created = await apiRequest("/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // Augment local state with client portal metadata for immediate preview
      const localProject = {
        ...created,
        code: newCode,
        clientName: newClientName || "Cliente General",
        stage: newStage,
        progressPct: Number(newProgress),
        milestones: [
          { id: 1, title: "Reunión de relevamiento & Mapa de Procesos", stage: "RELEVAMIENTO", isCompleted: true },
          { id: 2, title: "Prototipo interactivo en Figma", stage: "DISENO", isCompleted: true },
          { id: 3, title: "Desarrollo de API e Integración de Servicios", stage: "DESARROLLO", isCompleted: false },
        ],
      };

      setProjects((prev) => [localProject, ...prev]);
      setCreateModalOpen(false);
      setNewTitle("");
      setNewClientName("");
      setNewDescription("");
    } catch (err: any) {
      alert("Error al crear proyecto: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSubmitting(true);

    try {
      await apiRequest(`/projects/${editingProject.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editingProject.title,
          description: editingProject.description,
        }),
      });

      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? { ...editingProject } : p))
      );
      setEditingProject(null);
    } catch (err: any) {
      alert("Error al actualizar proyecto: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return;
    try {
      await apiRequest(`/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingProject?.id === id) setEditingProject(null);
    } catch (err: any) {
      alert("Error al eliminar proyecto: " + err.message);
    }
  };

  const toggleMilestone = (project: any, milestoneId: number) => {
    const updatedMilestones = (project.milestones || []).map((m: any) =>
      m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m
    );
    const updated = { ...project, milestones: updatedMilestones };
    setEditingProject(updated);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-sora font-extrabold text-white">
            Gestión de Proyectos & Hitos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Administrá etapas de desarrollo, avances e hitos entregables visibles en el portal cliente.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchProjectsAndUsers}
            className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
          >
            <IconRefresh size={16} className={`mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            className="font-bold flex items-center gap-1.5"
          >
            <IconPlus size={16} />
            <span>Crear Proyecto</span>
          </Button>
        </div>
      </div>

      {/* Projects Cards List */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-500 font-mono">
          Cargando proyectos...
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 space-y-3">
          <IconBriefcase size={44} className="mx-auto opacity-40" />
          <h3 className="text-lg font-sora font-bold text-slate-300">
            No hay proyectos registrados
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Hacé clic en el botón a continuación para dar de alta el primer proyecto de desarrollo.
          </p>
          <Button
            variant="gold"
            onClick={() => setCreateModalOpen(true)}
            className="mt-2 font-bold"
          >
            Crear Primer Proyecto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    CÓDIGO: {proj.code || `CDH-2026-00${proj.id}`}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-white">
                    {proj.progressPct ?? 50}% avance
                  </span>
                </div>

                <h3 className="text-xl font-sora font-extrabold text-white leading-tight">
                  {proj.title || proj.name}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <IconBuildingStore size={15} className="text-amber-400" />
                    {proj.clientName || "Distribuidora del Sur S.A."}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconUser size={15} className="text-sky-400" />
                    {proj.manager?.name || "Equipo Codeah"}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${proj.progressPct ?? 50}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Etapa actual:</span>
                  <Badge variant="gold" className="text-[10px] uppercase font-mono">
                    {proj.stage || "DESARROLLO"}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <Link
                  href="/portal"
                  target="_blank"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
                >
                  <span>Vista Cliente (/portal)</span>
                  <IconExternalLink size={14} />
                </Link>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProject({ ...proj })}
                    className="border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800 text-xs flex items-center gap-1.5"
                  >
                    <IconEdit size={14} />
                    <span>Editar Hitos</span>
                  </Button>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10"
                    title="Eliminar proyecto"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <IconX size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Nuevo Proyecto
              </span>
              <h2 className="text-2xl font-sora font-extrabold text-white">
                Dar de Alta Proyecto
              </h2>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-300">
                  Nombre / Título del Proyecto *
                </label>
                <Input
                  required
                  placeholder="Ej: Sistema Integral de Gestión & Facturación AFIP"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold uppercase tracking-wider text-slate-300">
                    Cliente / Empresa
                  </label>
                  <Input
                    placeholder="Ej: Distribuidora del Sur S.A."
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold uppercase tracking-wider text-slate-300">
                    Código de Seguimiento
                  </label>
                  <Input
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold uppercase tracking-wider text-slate-300">
                    Etapa Inicial
                  </label>
                  <select
                    className="flex h-12 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                  >
                    <option value="RELEVAMIENTO">01. Relevamiento</option>
                    <option value="DISENO">02. Diseño UI/UX</option>
                    <option value="DESARROLLO">03. Desarrollo API</option>
                    <option value="PUESTA_EN_MARCHA">04. Puesta en marcha</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold uppercase tracking-wider text-slate-300">
                    % Avance Inicial ({newProgress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-4"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-300">
                  Descripción Corta
                </label>
                <Textarea
                  placeholder="Alcance inicial, especificaciones principales y servidor..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={2}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCreateModalOpen(false)}
                  className="border-slate-800 text-slate-400"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  disabled={submitting}
                  className="font-bold"
                >
                  {submitting ? "Creando..." : "Guardar Proyecto"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project & Milestones Drawer/Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <IconX size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Edición de Proyecto #{editingProject.id}
              </span>
              <h2 className="text-2xl font-sora font-extrabold text-white">
                {editingProject.title || editingProject.name}
              </h2>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-6 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold uppercase tracking-wider text-slate-300">
                    Etapa Actual
                  </label>
                  <select
                    className="flex h-12 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    value={editingProject.stage || "DESARROLLO"}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, stage: e.target.value })
                    }
                  >
                    <option value="RELEVAMIENTO">01. Relevamiento</option>
                    <option value="DISENO">02. Diseño UI/UX</option>
                    <option value="DESARROLLO">03. Desarrollo API</option>
                    <option value="PUESTA_EN_MARCHA">04. Puesta en marcha</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold uppercase tracking-wider text-slate-300">
                    % Avance ({editingProject.progressPct ?? 50}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingProject.progressPct ?? 50}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        progressPct: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-4"
                  />
                </div>
              </div>

              {/* Milestones Checklist Editor */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <IconSparkles size={16} className="text-amber-400" />
                    <span>Hitos de Entrega del Proyecto</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Hacé clic para alternar estado
                  </span>
                </div>

                <div className="space-y-2">
                  {(editingProject.milestones || [
                    { id: 1, title: "Reunión de relevamiento & Mapa de Procesos", isCompleted: true },
                    { id: 2, title: "Prototipo interactivo navegable (Figma UI)", isCompleted: true },
                    { id: 3, title: "Desarrollo de módulos e integración AFIP WebService", isCompleted: false },
                    { id: 4, title: "Pruebas de estrés & Capacitación del equipo", isCompleted: false },
                  ]).map((m: any) => (
                    <div
                      key={m.id}
                      onClick={() => toggleMilestone(editingProject, m.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        m.isCompleted
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          : "bg-slate-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                            m.isCompleted
                              ? "bg-emerald-500 border-emerald-400 text-slate-950 font-bold"
                              : "border-slate-700 bg-slate-900"
                          }`}
                        >
                          {m.isCompleted && <IconCheck size={14} />}
                        </div>
                        <span className={`text-sm ${m.isCompleted ? "line-through text-slate-400" : "font-medium"}`}>
                          {m.title}
                        </span>
                      </div>
                      <Badge
                        variant={m.isCompleted ? "success" : "gold"}
                        className="text-[9px]"
                      >
                        {m.isCompleted ? "COMPLETADO" : "PENDIENTE"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProject(null)}
                  className="border-slate-800 text-slate-400"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  disabled={submitting}
                  className="font-bold"
                >
                  {submitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
