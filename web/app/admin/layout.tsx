"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  IconLayoutDashboard,
  IconInbox,
  IconBriefcase,
  IconUsers,
  IconLogout,
  IconExternalLink,
  IconChevronRight,
  IconShield,
} from "@tabler/icons-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const isLoginPage = pathname === "/admin/login";

  React.useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [loading, user, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 space-y-4">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono tracking-wider uppercase">Cargando Panel Admin...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: IconLayoutDashboard },
    { label: "Prospectos / Leads", href: "/admin/leads", icon: IconInbox },
    { label: "Proyectos & Hitos", href: "/admin/projects", icon: IconBriefcase },
    { label: "Usuarios & Clientes", href: "/admin/users", icon: IconUsers },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen">
        <div className="p-6 space-y-8">
          <Link href="/admin" className="block">
            <div className="relative h-8 w-36">
              <Image
                src="/logo-codeah-light.png"
                alt="Codeah Admin"
                fill
                sizes="150px"
                className="object-contain object-left"
              />
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mt-1.5">
              Panel de Administración
            </span>
          </Link>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <IconChevronRight size={16} />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & logout footer */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
            >
              <IconLogout size={14} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              {navItems.find((n) =>
                n.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(n.href)
              )?.label || "Panel"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60"
            >
              <span>Ver Web Principal</span>
              <IconExternalLink size={14} />
            </Link>
            <Link
              href="/portal"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg font-medium"
            >
              <span>Ver Portal Clientes</span>
              <IconExternalLink size={14} />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
