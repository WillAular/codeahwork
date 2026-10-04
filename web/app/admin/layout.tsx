"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  IconLayoutDashboard,
  IconInbox,
  IconBriefcase,
  IconUsers,
  IconLogout,
  IconExternalLink,
  IconChevronRight,
  IconChevronDown,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconSun,
  IconMoon,
  IconShield,
  IconMenu2,
  IconX,
  IconUser,
} from "@tabler/icons-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { theme, toggleTheme } = useAdminTheme();

  // Sidebar collapse state
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // User menu dropdown state
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const isLoginPage = pathname === "/admin/login";

  // Load saved sidebar collapsed state
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("codeah_admin_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  // Close dropdown on outside click or Escape
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

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
      <div className={`min-h-screen flex flex-col items-center justify-center space-y-4 ${
        theme === "dark" ? "bg-slate-950 text-slate-400" : "bg-slate-50 text-slate-600"
      }`}>
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono tracking-wider uppercase font-semibold">Cargando Panel Admin...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("codeah_admin_sidebar_collapsed", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: IconLayoutDashboard },
    { label: "Prospectos / Leads", href: "/admin/leads", icon: IconInbox },
    { label: "Proyectos & Hitos", href: "/admin/projects", icon: IconBriefcase },
    { label: "Usuarios & Clientes", href: "/admin/users", icon: IconUsers },
  ];

  const currentNav = navItems.find((n) =>
    n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-200 flex ${
        theme === "dark"
          ? "dark bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Mobile Sidebar Overlay Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className={`w-64 h-full p-6 flex flex-col justify-between shadow-2xl transition-transform ${
              theme === "dark"
                ? "bg-slate-900 border-r border-slate-800"
                : "bg-white border-r border-slate-200 text-slate-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/admin" className="block">
                  <div className="relative h-8 w-32">
                    <Image
                      src={theme === "dark" ? "/logo-codeah-light.png" : "/logo-codeah.png"}
                      alt="Codeah Admin"
                      fill
                      sizes="140px"
                      className="object-contain object-left"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className={`p-1.5 rounded-lg border ${
                    theme === "dark"
                      ? "text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800"
                      : "text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <IconX size={18} />
                </button>
              </div>

              <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block">
                Panel de Administración
              </span>

              <nav className="space-y-1.5 pt-2">
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                          : theme === "dark"
                          ? "text-slate-400 hover:text-white hover:bg-slate-800/70"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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

            <div className={`pt-4 border-t ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-500 flex items-center justify-center font-bold text-sm shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-bold truncate ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {user.name}
                  </p>
                  <p className={`text-[10px] truncate ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar navigation */}
      <aside
        className={`shrink-0 hidden md:flex flex-col justify-between sticky top-0 h-screen transition-all duration-300 ease-in-out border-r z-40 ${
          isCollapsed ? "w-[76px]" : "w-64"
        } ${
          theme === "dark"
            ? "bg-slate-900/95 border-slate-800/90 text-slate-100"
            : "bg-white/95 border-slate-200/90 text-slate-900 shadow-sm"
        }`}
      >
        <div className={`space-y-6 ${isCollapsed ? "p-3" : "p-5"}`}>
          {/* Sidebar Top: Logo & Toggle Button */}
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-3 pt-2">
              {/* Emblem icon */}
              <Link
                href="/admin"
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-sora font-extrabold text-lg shadow-md shadow-amber-500/20 hover:scale-105 transition-transform"
                title="Codeah Admin"
              >
                C
              </Link>
              {/* Expand Toggle Button */}
              <button
                onClick={toggleSidebar}
                className={`p-2 rounded-xl border transition-all ${
                  theme === "dark"
                    ? "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800"
                    : "border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
                title="Expandir menú lateral"
                aria-label="Expandir menú lateral"
              >
                <IconLayoutSidebarRightCollapse size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Link href="/admin" className="block">
                  <div className="relative h-8 w-32">
                    <Image
                      src={theme === "dark" ? "/logo-codeah-light.png" : "/logo-codeah.png"}
                      alt="Codeah Admin"
                      fill
                      sizes="140px"
                      className="object-contain object-left"
                      priority
                    />
                  </div>
                </Link>
                {/* Collapse Toggle Button */}
                <button
                  onClick={toggleSidebar}
                  className={`p-1.5 rounded-xl border transition-all ${
                    theme === "dark"
                      ? "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800"
                      : "border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  }`}
                  title="Plegar menú lateral"
                  aria-label="Plegar menú lateral"
                >
                  <IconLayoutSidebarLeftCollapse size={18} />
                </button>
              </div>
              <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block">
                Panel de Administración
              </span>
            </div>
          )}

          {/* Nav Items */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              if (isCollapsed) {
                return (
                  <div key={item.href} className="relative group flex justify-center">
                    <Link
                      href={item.href}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                          : theme === "dark"
                          ? "text-slate-400 hover:text-white hover:bg-slate-800/80"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                      aria-label={item.label}
                    >
                      <Icon size={20} />
                    </Link>
                    {/* Floating Tooltip */}
                    <div
                      className={`absolute left-full ml-3 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl z-50 ${
                        theme === "dark"
                          ? "bg-slate-900 text-white border border-slate-700"
                          : "bg-slate-900 text-white border border-slate-800"
                      }`}
                    >
                      {item.label}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : theme === "dark"
                      ? "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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

        {/* Sidebar Footer: Compact status / User profile hint */}
        <div
          className={`border-t transition-all ${
            isCollapsed ? "p-3 flex justify-center" : "p-4 space-y-2"
          } ${
            theme === "dark"
              ? "border-slate-800/80 bg-slate-950/40"
              : "border-slate-200/80 bg-slate-50/70"
          }`}
        >
          {isCollapsed ? (
            <div className="relative group">
              <div
                className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-500 flex items-center justify-center font-bold text-sm cursor-default"
                title={`${user.name} (${user.email})`}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div
                className={`absolute left-full ml-3 bottom-0 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl z-50 ${
                  theme === "dark"
                    ? "bg-slate-900 text-white border border-slate-700"
                    : "bg-slate-900 text-white border border-slate-800"
                }`}
              >
                <p className="font-bold">{user.name}</p>
                <p className="text-[10px] text-slate-300">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-500 flex items-center justify-center font-bold text-sm shrink-0">
                {user.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs font-bold truncate ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {user.name}
                </p>
                <p
                  className={`text-[10px] truncate ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navbar */}
        <header
          className={`h-16 border-b backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors ${
            theme === "dark"
              ? "border-slate-800 bg-slate-900/70 text-slate-100"
              : "border-slate-200 bg-white/80 text-slate-900 shadow-xs"
          }`}
        >
          {/* Left: Mobile trigger & Section Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className={`p-2 rounded-xl border md:hidden ${
                theme === "dark"
                  ? "border-slate-800 bg-slate-800/80 text-slate-300 hover:text-white"
                  : "border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
              aria-label="Abrir menú"
            >
              <IconMenu2 size={18} />
            </button>

            <div className="flex items-center gap-2">
              {currentNav?.icon && (
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-slate-800 text-amber-400"
                      : "bg-slate-100 text-amber-600"
                  }`}
                >
                  <currentNav.icon size={16} />
                </div>
              )}
              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                {currentNav?.label || "Panel Admin"}
              </span>
            </div>
          </div>

          {/* Right: Quick actions, Theme Toggle & User Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick links */}
            <Link
              href="/"
              target="_blank"
              className={`hidden lg:inline-flex items-center gap-1.5 text-xs transition-colors px-3 py-1.5 rounded-xl border font-medium ${
                theme === "dark"
                  ? "text-slate-400 hover:text-white bg-slate-800/60 border-slate-700/60 hover:bg-slate-800"
                  : "text-slate-600 hover:text-slate-900 bg-slate-100 border-slate-200 hover:bg-slate-200"
              }`}
            >
              <span>Web Principal</span>
              <IconExternalLink size={14} />
            </Link>

            <Link
              href="/portal"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl font-medium"
            >
              <span>Portal Clientes</span>
              <IconExternalLink size={14} />
            </Link>

            {/* Modo Claro / Modo Oscuro Toggle (Single Icon Button) */}
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all ${
                theme === "dark"
                  ? "border-slate-700/80 bg-slate-800/80 text-amber-400 hover:bg-slate-700 hover:text-amber-300 hover:scale-105"
                  : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 hover:scale-105"
              }`}
              title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark" ? (
                <IconSun size={18} className="transition-transform duration-300 hover:rotate-45" />
              ) : (
                <IconMoon size={18} className="transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* User Profile Dropdown with Logout */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 sm:gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border transition-all ${
                  userDropdownOpen
                    ? theme === "dark"
                      ? "border-amber-400/50 bg-slate-800 text-white"
                      : "border-amber-500/50 bg-slate-100 text-slate-900"
                    : theme === "dark"
                    ? "border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200"
                    : "border-slate-200 bg-white hover:bg-slate-100 text-slate-800"
                }`}
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold leading-tight truncate max-w-[120px]">
                    {user.name}
                  </p>
                  <p className={`text-[10px] leading-tight ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    Admin
                  </p>
                </div>
                <IconChevronDown
                  size={15}
                  className={`text-slate-400 transition-transform duration-200 ${
                    userDropdownOpen ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </button>

              {/* Floating Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-64 rounded-2xl p-2 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    theme === "dark"
                      ? "bg-slate-900/98 border-slate-800 text-slate-100 shadow-slate-950/80"
                      : "bg-white/98 border-slate-200 text-slate-900 shadow-slate-300/60"
                  }`}
                >
                  {/* User info header */}
                  <div className={`p-3 rounded-xl mb-1 ${theme === "dark" ? "bg-slate-950/60" : "bg-slate-50"}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-500 flex items-center justify-center font-bold text-sm shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold truncate">{user.name}</p>
                        <p className={`text-[11px] truncate ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          {user.email}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-[10px] font-mono font-bold text-amber-500">
                          <IconShield size={12} />
                          <span>{user.role || "ADMIN"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links inside Dropdown */}
                  <div className="space-y-0.5 py-1">
                    <Link
                      href="/portal"
                      target="_blank"
                      onClick={() => setUserDropdownOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        theme === "dark"
                          ? "text-slate-300 hover:text-white hover:bg-slate-800"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconBriefcase size={16} className="text-amber-500" />
                        <span>Portal Clientes</span>
                      </div>
                      <IconExternalLink size={14} className="text-slate-400" />
                    </Link>

                    <Link
                      href="/"
                      target="_blank"
                      onClick={() => setUserDropdownOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        theme === "dark"
                          ? "text-slate-300 hover:text-white hover:bg-slate-800"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconExternalLink size={16} className="text-blue-500" />
                        <span>Ver Web Principal</span>
                      </div>
                      <IconExternalLink size={14} className="text-slate-400" />
                    </Link>
                  </div>

                  <div className={`my-1 border-t ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`} />

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      theme === "dark"
                        ? "text-rose-400 hover:bg-rose-500/15"
                        : "text-rose-600 hover:bg-rose-50"
                    }`}
                  >
                    <IconLogout size={16} />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
