import { motion } from "framer-motion";
import {
  CreditCard,
  Zap,
  Workflow,
  CheckCircle2,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { usageData } from "../lib/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const tokenBreakdown = [
  { name: "Research", value: 45, color: "#a855f7" },
  { name: "Analysis", value: 25, color: "#f97316" },
  { name: "Writer", value: 20, color: "#22c55e" },
  { name: "Planner", value: 7, color: "#ec4899" },
  { name: "Verification", value: 3, color: "#3b82f6" },
];

export default function BillingPage() {
  const { user } = useAuthStore();
  const tokenPercent = Math.min(((user?.tokensUsed || 0) / (user?.tokensLimit || 1)) * 100, 100);
  const workflowPercent = Math.min(((user?.workflowsUsed || 0) / (user?.workflowsLimit || 1)) * 100, 100);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Billing & Usage</h1>
        <p className="text-foreground-muted text-sm mt-1">
          Monitor your plan, usage, and spending
        </p>
      </div>

      {/* Plan Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-surface border border-border mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold capitalize">{user?.plan} Plan</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  Active
                </span>
              </div>
              <p className="text-sm text-foreground-muted">
                Renews on March 15, 2025 · Next billing $99
              </p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all">
            Upgrade Plan
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Usage Stats */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-xl bg-surface border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Token Usage</h3>
              <p className="text-xs text-foreground-muted">This billing period</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground-muted">
                {((user?.tokensUsed || 0) / 1000).toFixed(0)}k / {(user?.tokensLimit || 0) / 1000}k tokens
              </span>
              <span className="font-medium">{tokenPercent.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${tokenPercent}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">2.8M</div>
              <div className="text-xs text-foreground-muted">Used</div>
            </div>
            <div>
              <div className="text-lg font-bold">2.2M</div>
              <div className="text-xs text-foreground-muted">Remaining</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">57%</div>
              <div className="text-xs text-foreground-muted">Utilization</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl bg-surface border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Workflow className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Workflow Usage</h3>
              <p className="text-xs text-foreground-muted">This billing period</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground-muted">
                {user?.workflowsUsed || 0} / {user?.workflowsLimit || 0} workflows
              </span>
              <span className="font-medium">{workflowPercent.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${workflowPercent}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">127</div>
              <div className="text-xs text-foreground-muted">Run</div>
            </div>
            <div>
              <div className="text-lg font-bold">373</div>
              <div className="text-xs text-foreground-muted">Remaining</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">25%</div>
              <div className="text-xs text-foreground-muted">Utilization</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 p-5 rounded-xl bg-surface border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Daily Token Usage</h3>
            <div className="flex items-center gap-1 text-xs text-foreground-muted">
              <Calendar className="w-3.5 h-3.5" />
              Last 7 days
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorTokens2" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#colorTokens2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 rounded-xl bg-surface border border-border"
        >
          <h3 className="font-semibold mb-4">Token Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {tokenBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#181820",
                    border: "1px solid #272735",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {tokenBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs flex-1">{item.name}</span>
                <span className="text-xs font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Invoice History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-5 rounded-xl bg-surface border border-border"
      >
        <h3 className="font-semibold mb-4">Invoice History</h3>
        <div className="space-y-2">
          {[
            { date: "Feb 15, 2025", amount: "$99.00", status: "Paid", plan: "Pro" },
            { date: "Jan 15, 2025", amount: "$99.00", status: "Paid", plan: "Pro" },
            { date: "Dec 15, 2024", amount: "$99.00", status: "Paid", plan: "Pro" },
          ].map((invoice) => (
            <div
              key={invoice.date}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">{invoice.plan} Plan</p>
                  <p className="text-xs text-foreground-muted">{invoice.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{invoice.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
