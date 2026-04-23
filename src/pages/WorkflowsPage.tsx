import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  FileText,
} from "lucide-react";
import { useWorkflowStore } from "../store/workflowStore";
import { mockWorkflows } from "../lib/mockData";
import { formatRelativeTime, formatDuration } from "../lib/utils";
import { useState } from "react";

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Completed" },
  running: { icon: Loader2, color: "text-primary", bg: "bg-primary/10", label: "Running" },
  failed: { icon: XCircle, color: "text-danger", bg: "bg-danger/10", label: "Failed" },
  queued: { icon: Clock, color: "text-warning", bg: "bg-warning/10", label: "Queued" },
  cancelled: { icon: XCircle, color: "text-foreground-muted", bg: "bg-foreground-muted/10", label: "Cancelled" },
};

export default function WorkflowsPage() {
  const navigate = useNavigate();
  const { workflows, setCurrentWorkflow } = useWorkflowStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const allWorkflows = [...workflows, ...mockWorkflows];
  const filtered = allWorkflows.filter((w) => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || w.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-foreground-muted text-sm mt-1">
            Manage and monitor all your automated workflows
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/workflows/new")}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-foreground-muted" />
          {["all", "completed", "running", "failed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-surface-elevated text-foreground-muted border border-border hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Workflow List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-foreground-subtle mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No workflows found</h3>
            <p className="text-foreground-muted text-sm mb-4">
              {search ? "Try adjusting your search" : "Create your first workflow to get started"}
            </p>
            {!search && (
              <button
                onClick={() => navigate("/dashboard/workflows/new")}
                className="text-primary hover:text-primary-hover text-sm font-medium"
              >
                Create workflow →
              </button>
            )}
          </div>
        ) : (
          filtered.map((workflow, i) => {
            const config = statusConfig[workflow.status];
            const StatusIcon = config.icon;
            return (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setCurrentWorkflow(workflow);
                  navigate(`/dashboard/workflows/${workflow.id}`);
                }}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                  <StatusIcon className={`w-5 h-5 ${config.color} ${workflow.status === "running" ? "animate-spin" : ""}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {workflow.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-foreground-muted">
                      {formatRelativeTime(workflow.createdAt)}
                    </span>
                    {workflow.duration && (
                      <span className="text-xs text-foreground-muted">
                        {formatDuration(workflow.duration)}
                      </span>
                    )}
                    {workflow.tokensUsed > 0 && (
                      <span className="text-xs text-foreground-muted">
                        {(workflow.tokensUsed / 1000).toFixed(1)}k tokens
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {workflow.status === "running" && (
                    <div className="w-24">
                      <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${workflow.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-foreground-muted mt-1 text-right">
                        {workflow.progress}%
                      </div>
                    </div>
                  )}
                  <span className={`text-xs px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
                    {config.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-foreground transition-colors" />
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
