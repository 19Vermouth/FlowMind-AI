import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Workflow,
  Plus,
  CreditCard,
  Settings,
  LogOut,
  X,
  Zap,
  BrainCircuit,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { cn } from "../../lib/utils";

interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/workflows", icon: Workflow, label: "Workflows" },
  { to: "/dashboard/workflows/new", icon: Plus, label: "New Workflow" },
  { to: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  return (
    <div className="w-64 h-full bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">FlowMind</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-hover">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground-muted hover:text-foreground hover:bg-surface-hover"
              )}
            >
              <item.icon className={cn("w-4.5 h-4.5", isActive && "text-primary")} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Usage */}
      <div className="px-4 py-3 mx-3 mb-3 rounded-lg bg-surface-elevated border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-foreground-muted">Usage</span>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground-muted">Tokens</span>
              <span className="text-foreground">
                {((user?.tokensUsed || 0) / 1000).toFixed(0)}k / {(user?.tokensLimit || 0) / 1000}k
              </span>
            </div>
            <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    ((user?.tokensUsed || 0) / (user?.tokensLimit || 1)) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground-muted">Workflows</span>
              <span className="text-foreground">
                {user?.workflowsUsed || 0} / {user?.workflowsLimit || 0}
              </span>
            </div>
            <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    ((user?.workflowsUsed || 0) / (user?.workflowsLimit || 1)) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-3 py-3 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
            <p className="text-xs text-foreground-muted truncate">{user?.plan} plan</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg hover:bg-surface-hover text-foreground-muted hover:text-danger transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
