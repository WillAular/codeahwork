"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconLock, IconMail, IconAlertCircle, IconArrowRight, IconShieldCheck } from "@tabler/icons-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, user, token } = useAuth();

  const [email, setEmail] = React.useState("admin@codeah.com");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (token && user) {
      router.push("/admin");
    }
  }, [token, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión. Verifica las credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--azul-codeah)]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="relative h-10 w-44 mx-auto">
            <Image
              src="/logo-codeah-light.png"
              alt="Codeah Admin"
              fill
              sizes="180px"
              className="object-contain"
              priority
            />
          </div>
          <div className="pt-2">
            <h1 className="text-xl font-sora font-extrabold text-white">
              Panel de Administración
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Ingresá con tus credenciales de equipo o administrador.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <IconAlertCircle size={18} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Correo Electrónico
            </label>
            <div className="relative">
              <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <Input
                type="email"
                required
                placeholder="admin@codeah.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Contraseña
            </label>
            <div className="relative">
              <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <Input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-slate-950/60 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-amber-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={loading}
            className="w-full mt-2 font-bold flex items-center justify-center gap-2 py-6 text-base"
          >
            {loading ? (
              "Verificando..."
            ) : (
              <>
                <span>Ingresar al Panel</span>
                <IconArrowRight size={18} />
              </>
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-800/80 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
          <IconShieldCheck size={16} className="text-emerald-500" />
          <span>Acceso restringido para personal autorizado Codeah</span>
        </div>
      </div>
    </div>
  );
}
