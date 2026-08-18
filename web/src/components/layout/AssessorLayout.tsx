import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { tenantAtom } from "@/stores/tenantAtom";
import { authAtom, clearToken } from "@/stores/authAtom";
import { Button } from "@/components/ui/button";
import { ClipboardList, Briefcase, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/assessments", label: "Assessments", icon: ClipboardList },
  { href: "/vacancies", label: "Vacancies", icon: Briefcase },
];

export default function AssessorLayout() {
  const tenant = useAtomValue(tenantAtom);
  const setAuth = useSetAtom(authAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearToken();
    setAuth({ token: null });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 selection:bg-teal-500 selection:text-white">
      {/* Frozen Glass Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/assessments" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img
                src="/rakamin-logo.png"
                alt="Rakamin Logo"
                className="h-6 object-contain"
              />
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                Admin Console
              </span>
            </Link>
            <nav className="flex items-center gap-1.5">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = location.pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    to={href}
                    className={cn(
                      "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all",
                      isActive
                        ? "bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-400")} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {tenant.name && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-full px-3 py-1 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-slate-500 dark:text-slate-400 font-normal">Tenant:</span>
                <span className="font-semibold">{tenant.name}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

