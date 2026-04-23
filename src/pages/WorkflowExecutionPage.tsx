import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Zap,
  RotateCcw,
  XCircle,
  CheckCircle2,
  Loader2,
  Terminal,
  ChevronDown,
  ChevronRight,
  BrainCircuit,
  TrendingUp,
  FileText,
  Activity,
  Sparkles,
} from "lucide-react";
import { useWorkflowStore, AgentType } from "../store/workflowStore";
import { mockWorkflows } from "../lib/mockData";
import { formatDuration } from "../lib/utils";

const agentConfig: Record<AgentType, { icon: typeof BrainCircuit; color: string; bg: string; label: string }> = {
  planner: { icon: Sparkles, color: "text-agent-planner", bg: "bg-agent-planner/10", label: "Head Planner" },
  research: { icon: Zap, color: "text-agent-research", bg: "bg-agent-research/10", label: "Research Agent" },
  analysis: { icon: TrendingUp, color: "text-agent-analysis", bg: "bg-agent-analysis/10", label: "Analysis Agent" },
  writer: { icon: FileText, color: "text-agent-writer", bg: "bg-agent-writer/10", label: "Writer Agent" },
  verification: { icon: Activity, color: "text-agent-verification", bg: "bg-agent-verification/10", label: "Verification Agent" },
};

const statusIcons = {
  queued: Clock,
  running: Loader2,
  completed: CheckCircle2,
  failed: XCircle,
  cancelled: XCircle,
};

export default function WorkflowExecutionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { workflows, currentWorkflow, setCurrentWorkflow, cancelWorkflow, rerunWorkflow } = useWorkflowStore();
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const workflow = currentWorkflow || workflows.find((w) => w.id === id) || mockWorkflows.find((w) => w.id === id);

  useEffect(() => {
    if (!workflow) return;
    setCurrentWorkflow(workflow);
  }, [workflow, setCurrentWorkflow]);

  useEffect(() => {
    if (!workflow || workflow.status !== "running") return;
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 100);
    }, 100);
    return () => clearInterval(interval);
  }, [workflow]);

  useEffect(() => {
    setElapsed(0);
  }, [id]);

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-foreground-muted">Workflow not found</p>
          <button
            onClick={() => navigate("/dashboard/workflows")}
            className="text-primary text-sm mt-2 hover:underline"
          >
            Back to workflows
          </button>
        </div>
      </div>
    );
  }

  const isRunning = workflow.status === "running";
  const isCompleted = workflow.status === "completed";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/workflows")}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-semibold truncate max-w-md">{workflow.title}</h1>
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <span>ID: {workflow.id}</span>
              <span>·</span>
              <span>
                {isRunning
                  ? formatDuration(elapsed)
                  : workflow.duration
                  ? formatDuration(workflow.duration)
                  : "--"}
              </span>
              {workflow.tokensUsed > 0 && (
                <>
                  <span>·</span>
                  <span>{(workflow.tokensUsed / 1000).toFixed(1)}k tokens</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isRunning && (
            <button
              onClick={() => cancelWorkflow(workflow.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-danger bg-danger/10 hover:bg-danger/20 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          )}
          {isCompleted && (
            <button
              onClick={() => navigate(`/dashboard/workflows/${workflow.id}/result`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-primary text-white hover:bg-primary-hover transition-colors"
            >
              <FileText className="w-4 h-4" />
              View Result
            </button>
          )}
          <button
            onClick={() => rerunWorkflow(workflow.id)}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-surface-elevated border border-border hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            Rerun
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="h-1 bg-surface-hover">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${workflow.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-6">
          {/* Task Graph */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">
              Execution Graph
            </h2>
            <div className="space-y-3">
              {workflow.tasks.map((task, index) => {
                const config = agentConfig[task.agentType];
                const Icon = config.icon;
                const StatusIcon = statusIcons[task.status];
                const isExpanded = expandedTask === task.id;

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-xl border transition-all ${
                      task.status === "running"
                        ? "border-primary/30 bg-primary/5"
                        : task.status === "completed"
                        ? "border-success/20 bg-success/5"
                        : task.status === "failed"
                        ? "border-danger/20 bg-danger/5"
                        : "border-border bg-surface"
                    }`}
                  >
                    <div
                      className="flex items-center gap-3 p-4 cursor-pointer"
                      onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                    >
                      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{task.name}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusIcon
                            className={`w-3.5 h-3.5 ${
                              task.status === "running"
                                ? "text-primary animate-spin"
                                : task.status === "completed"
                                ? "text-success"
                                : task.status === "failed"
                                ? "text-danger"
                                : "text-foreground-muted"
                            }`}
                          />
                          <span className="text-xs text-foreground-muted capitalize">{task.status}</span>
                          {task.progress > 0 && task.status !== "completed" && (
                            <span className="text-xs text-foreground-muted">{task.progress}%</span>
                          )}
                        </div>
                      </div>
                      {task.logs.length > 0 && (
                        <button className="p-1 rounded hover:bg-surface-hover transition-colors">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-foreground-muted" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-foreground-muted" />
                          )}
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {isExpanded && task.logs.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <div className="bg-surface-elevated rounded-lg p-3 space-y-1.5">
                              {task.logs.map((log, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs">
                                  <Terminal className="w-3 h-3 text-foreground-subtle shrink-0 mt-0.5" />
                                  <span className="text-foreground-muted">{log}</span>
                                </div>
                              ))}
                              {task.output && (
                                <div className="mt-2 pt-2 border-t border-border">
                                  <p className="text-xs text-foreground">{task.output}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Status Card */}
            <div className="p-4 rounded-xl bg-surface border border-border">
              <h3 className="text-sm font-semibold mb-3">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">State</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      workflow.status === "completed"
                        ? "bg-success/10 text-success"
                        : workflow.status === "running"
                        ? "bg-primary/10 text-primary"
                        : workflow.status === "failed"
                        ? "bg-danger/10 text-danger"
                        : "bg-foreground-muted/10 text-foreground-muted"
                    }`}
                  >
                    {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Progress</span>
                  <span className="text-sm font-medium">{workflow.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Tasks</span>
                  <span className="text-sm font-medium">
                    {workflow.tasks.filter((t) => t.status === "completed").length} / {workflow.tasks.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Duration</span>
                  <span className="text-sm font-medium">
                    {isRunning
                      ? formatDuration(elapsed)
                      : workflow.duration
                      ? formatDuration(workflow.duration)
                      : "--"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Tokens</span>
                  <span className="text-sm font-medium">
                    {workflow.tokensUsed > 0 ? workflow.tokensUsed.toLocaleString() : "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Agents */}
            <div className="p-4 rounded-xl bg-surface border border-border">
              <h3 className="text-sm font-semibold mb-3">Active Agents</h3>
              <div className="space-y-2">
                {workflow.tasks.map((task) => {
                  const config = agentConfig[task.agentType];
                  const Icon = config.icon;
                  return (
                    <div key={task.id} className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-md ${config.bg} flex items-center justify-center`}>
                        <Icon className={`w-3 h-3 ${config.color}`} />
                      </div>
                      <span className="text-xs flex-1">{config.label}</span>
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          task.status === "completed"
                            ? "bg-success"
                            : task.status === "running"
                            ? "bg-primary animate-pulse"
                            : "bg-foreground-subtle"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prompt */}
            <div className="p-4 rounded-xl bg-surface border border-border">
              <h3 className="text-sm font-semibold mb-2">Original Prompt</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">{workflow.prompt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
