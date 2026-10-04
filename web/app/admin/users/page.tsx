"use client";

import * as React from "react";
import { apiRequest } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconUsers,
  IconUserPlus,
  IconSearch,
  IconShield,
  IconMail,
  IconX,
  IconRefresh,
} from "@tabler/icons-react";

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Form State
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("GESTOR_PROYECTOS");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("/users");
      if (Array.isArray(res)) {
        setUsers(res);
      }
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setSubmitting(true);
    try {
      const res = await apiRequest("/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res && res.id) {
        setUsers((prev) => [res, ...prev]);
        setModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error("Error creating user:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const query = search.toLowerCase();
    return (
      !search ||
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query) ||
      u.role?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-sora font-extrabold text-slate-900 dark:text-white">
            Gestión de Usuarios & Roles
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Administrá cuentas de equipo, gestores y accesos de clientes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            className="border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <IconRefresh size={16} className={`mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="font-bold flex items-center gap-1.5"
          >
            <IconUserPlus size={16} />
            <span>Nuevo Usuario</span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="relative">
          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <Input
            placeholder="Buscar por nombre, email o rol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus-visible:ring-amber-400"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs dark:shadow-xl">
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500 font-mono">
            Cargando usuarios...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-2">
            <IconUsers size={40} className="mx-auto opacity-40 text-amber-500" />
            <p className="text-sm font-medium">No se encontraron usuarios.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px] font-mono">
                <tr>
                  <th className="py-4 px-6">Usuario</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Rol de Acceso</th>
                  <th className="py-4 px-6 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                          {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <div className="font-sora font-bold text-slate-900 dark:text-white text-sm">
                            {u.name}
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">ID: #{u.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <IconMail size={14} className="text-amber-500" />
                        <span>{u.email}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          u.role === "ADMINISTRADOR"
                            ? "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30"
                            : u.role === "GESTOR_PROYECTOS"
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
                            : "bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30"
                        }`}
                      >
                        <IconShield size={12} />
                        {u.role}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Activo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <IconX size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                Alta de Usuario
              </span>
              <h2 className="text-2xl font-sora font-extrabold text-slate-900 dark:text-white">
                Crear Nuevo Usuario
              </h2>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Nombre Completo *
                </label>
                <Input
                  required
                  placeholder="Ej. Lucas Fernández"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Correo Electrónico *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="lucas@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Contraseña (mínimo 6 caracteres) *
                </label>
                <Input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Rol de Usuario
                </label>
                <select
                  className="flex h-12 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  value={role}
                  onChange={(e: any) => setRole(e.target.value)}
                >
                  <option value="GESTOR_PROYECTOS">GESTOR_PROYECTOS (Project Manager)</option>
                  <option value="ADMINISTRADOR">ADMINISTRADOR (Super Admin)</option>
                  <option value="CLIENTE">CLIENTE (Acceso Portal)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                  className="border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400"
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
                  {submitting ? "Creando..." : "Crear Usuario"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
