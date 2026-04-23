import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Workflow,
  Clock,
  CheckCircle2,
  TrendingUp,
  Zap,
  Activity,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";
import { useWorkflowStore } from "../store/workflowStore";
import { mockWorkflows, mockActivities, usageData, agentStats } from "../lib/mockData";
import { formatRelativeTime } from "../lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const agentColors: Record<string, string> = {
  planner: "#ec4899",
  research: "#a855f7",
  analysis: "#f97316",
  writer: "#22c55e",
  verification: "#3b82f6",
};

const agentIcons: Record<string, typeof BrainCircuit> = {
  planner: BrainCircuit,
  research: Zap,
  analysis: TrendingUp,
  writer: CheckCircle2,
  verification: Activity,
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { workflows, setCurrentWorkflow } = useWorkflowStore();

  useEffect(() => {
    // Seed mock data
    const store = useWorkflowStore.getState();
    if (store.workflows.length === 0) {
      store.workflows = mockWorkflows;
      store.activities = mockActivities;
    }
  }, []);

  const allWorkflows = [...workflows, ...mockWorkflows].slice(0, 5);
  const completedCount = allWorkflows.filter((w) => w.status === "completed").length;
  const totalTokens = allWorkflows.reduce((sum, w) => sum + (w.tokensUsed || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-foreground-muted text-sm mt-1">
            Monitor your agents, workflows, and usage
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Workflows",
            value: allWorkflows.length.toString(),
            icon: Workflow,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Completed",
            value: completedCount.toString(),
            icon: CheckCircle2,
            color: "text-success",
            bg: "bg-success/10",
          },
          {
            label: "Tokens Used",
            value: `${(totalTokens / 1000).toFixed(0)}k`,
            icon: Zap,
            color: "text-accent",
            bg: "bg-accent/10",
          },
          {
            label: "Avg Duration",
            value: "34s",
            icon: Clock,
            color: "text-warning",
            bg: "bg-warning/10",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl bg-surface border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-foreground-muted mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Usage Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-5 rounded-xl bg-surface border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Usage This Week</h3>
              <span className="text-xs text-foreground-muted">Last 7 days</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#272735" />
                  <XAxis dataKey="date" stroke="#5a5a6a" fontSize={12} />
                  <YAxis stroke="#5a5a6a" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#181820",
                      border: "1px solid #272735",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tokens"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorTokens)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Workflows */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-xl bg-surface border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Workflows</h3>
              <button
                onClick={() => navigate("/dashboard/workflows")}
                className="text-xs text-primary hover:text-primary-hover flex items-center gap-1 transition-colors"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {allWorkflows.length === 0 ? (
                <div className="text-center py-8 text-foreground-muted text-sm">
                  No workflows yet. Create your first one!
                </div>
              ) : (
                allWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    onClick={() => {
                      setCurrentWorkflow(workflow);
                      navigate(`/dashboard/workflows/${workflow.id}`);
                    }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer group"
                  >
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        workflow.status === "completed"
                          ? "bg-success"
                          : workflow.status === "running"
                          ? "bg-primary"
                          : workflow.status === "failed"
                          ? "bg-danger"
                          : "bg-foreground-muted"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {workflow.title}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5">
                        {formatRelativeTime(workflow.createdAt)} ·{" "}
                        {workflow.tokensUsed ? `${(workflow.tokensUsed / 1000).toFixed(1)}k tokens` : "0 tokens"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {workflow.status === "completed" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                          Done
                        </span>
                      )}
                      {workflow.status === "running" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {workflow.progress}%
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-xl bg-surface border border-border"
          >
            <h3 className="font-semibold mb-4">Agent Activity</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin">
              {mockActivities.slice(0, 8).map((activity) => {
                const Icon = agentIcons[activity.agentType] || BrainCircuit;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${agentColors[activity.agentType]}15` }}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: agentColors[activity.agentType] }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm leading-snug">{activity.message}</p>
                      <p className="text-xs text-foreground-muted mt-0.5">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Agent Performance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-5 rounded-xl bg-surface border border-border"
          >
            <h3 className="font-semibold mb-4">Agent Performance</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentStats} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#272735" horizontal={false} />
                  <XAxis type="number" stroke="#5a5a6a" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="#5a5a6a" fontSize={12} width={70} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#181820",
                      border: "1px solid #272735",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="runs" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-5 rounded-xl bg-surface border border-border"
          >
            <h3 className="font-semibold mb-4">Quick Start</h3>
            <div className="space-y-2">
              {[
                "Research top EV startups in India",
                "Analyze competitor pricing strategy",
                "Summarize support tickets",
                "Generate weekly sales report",
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => navigate("/dashboard/workflows/new")}
                  className="w-full text-left p-3 rounded-lg hover:bg-surface-hover transition-colors text-sm text-foreground-muted hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
