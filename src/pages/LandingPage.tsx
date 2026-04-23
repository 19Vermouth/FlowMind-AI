import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  ArrowRight,
  Zap,
  Shield,
  Workflow,
  BarChart3,
  Clock,
  CheckCircle2,
  Sparkles,
  Users,
  Globe,
  Lock,
  ChevronRight,
  Star,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const features = [
  {
    icon: BrainCircuit,
    title: "Multi-Agent Orchestration",
    description:
      "Specialized AI agents collaborate autonomously — planners, researchers, analysts, writers, and verifiers working in harmony.",
  },
  {
    icon: Zap,
    title: "Natural Language Workflows",
    description:
      "Describe what you need in plain English. Our Head Planner agent decomposes your request into an optimized execution graph.",
  },
  {
    icon: Shield,
    title: "Built-in Verification",
    description:
      "Every output passes through a dedicated Verification Agent that checks facts, consistency, and structural integrity.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Monitor agent performance, token usage, and workflow success rates with beautiful, actionable dashboards.",
  },
  {
    icon: Clock,
    title: "Persistent Memory",
    description:
      "Qdrant-powered semantic memory lets agents learn from past workflows and improve over time.",
  },
  {
    icon: Workflow,
    title: "Enterprise Orchestration",
    description:
      "Celery-backed task queues with retries, exponential backoff, parallel execution, and cancellation support.",
  },
];

const steps = [
  {
    num: "01",
    title: "Describe Your Goal",
    desc: "Type what you want in natural language. Upload files if needed.",
  },
  {
    num: "02",
    title: "Agents Plan & Execute",
    desc: "The Head Planner breaks your request into subtasks and assigns specialist agents.",
  },
  {
    num: "03",
    title: "Review & Download",
    desc: "Get polished results with full audit trails, sources, and downloadable artifacts.",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "VP of Strategy, TechVentures",
    text: "FlowMind cut our competitive analysis time from 3 days to 20 minutes. The multi-agent approach produces insights we'd never surface manually.",
  },
  {
    name: "David Park",
    role: "Founder, DataPulse",
    text: "We replaced three research contractors with FlowMind. The quality is consistently higher and it scales infinitely.",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Ops, ScaleUp Inc",
    text: "The verification agent caught factual errors that would have embarrassed us in a board presentation. Game changer.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for individuals and small teams exploring AI automation.",
    features: [
      "100 workflows / month",
      "500K tokens / month",
      "5 concurrent agents",
      "Basic memory",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "For growing teams that need serious automation power.",
    features: [
      "500 workflows / month",
      "5M tokens / month",
      "20 concurrent agents",
      "Advanced semantic memory",
      "Priority support",
      "Custom agent configs",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure for organizations at scale.",
    features: [
      "Unlimited workflows",
      "Unlimited tokens",
      "Unlimited agents",
      "Self-hosted option",
      "SSO & SAML",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg tracking-tight">FlowMind</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-foreground-muted hover:text-foreground transition-colors">How it Works</a>
              <a href="#pricing" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
                className="text-sm text-foreground-muted hover:text-foreground transition-colors px-3 py-2"
              >
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-sm bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              AI-First Multi-Agent Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-gradient-hero">Autonomous AI Agents</span>
              <br />
              <span className="text-foreground">That Work For You</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Describe complex business tasks in natural language. Our multi-agent system
              plans, researches, analyzes, writes, and verifies — delivering production-ready
              results in minutes, not days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] glow-primary"
              >
                Start Automating
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/dashboard/workflows/new")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 glass text-foreground px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:bg-surface-hover"
              >
                Try Demo
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { label: "Workflows Run", value: "2.4M+" },
              { label: "Agent Tasks", value: "12M+" },
              { label: "Time Saved", value: "890K hrs" },
              { label: "Uptime", value: "99.99%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-foreground-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Serious Work</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Every component engineered for production workloads. No toy demos — just
              enterprise-grade automation that scales.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 hover:glow-primary"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              From prompt to polished result in three simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.num}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2">
                    <ChevronRight className="w-6 h-6 text-foreground-subtle" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">See It In Action</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Watch autonomous agents collaborate to complete a complex research task.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-border bg-surface"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-elevated">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
              </div>
              <span className="text-xs text-foreground-muted ml-2">flowmind.ai/dashboard</span>
            </div>
            <div className="p-6 lg:p-8 grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-elevated border border-border">
                  <div className="text-xs text-foreground-muted mb-2">Prompt</div>
                  <p className="text-sm text-foreground">
                    "Research top EV startups in India and generate a comprehensive investor report with market sizing, competitive landscape, and risk assessment"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-agent-planner agent-dot" />
                  <span className="text-sm text-foreground-muted">Planner decomposing request...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-agent-research agent-dot" />
                  <span className="text-sm text-foreground-muted">Research Agent gathering data...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-agent-analysis agent-dot" />
                  <span className="text-sm text-foreground-muted">Analysis Agent processing trends...</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-elevated border border-border">
                <div className="text-xs text-foreground-muted mb-3">Live Execution Graph</div>
                <div className="space-y-3">
                  {[
                    { name: "Planner", status: "completed", color: "bg-agent-planner" },
                    { name: "Research", status: "completed", color: "bg-agent-research" },
                    { name: "Analysis", status: "running", color: "bg-agent-analysis" },
                    { name: "Writer", status: "queued", color: "bg-agent-writer" },
                    { name: "Verification", status: "queued", color: "bg-agent-verification" },
                  ].map((agent) => (
                    <div key={agent.name} className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${agent.color}`} />
                      <span className="text-sm flex-1">{agent.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        agent.status === "completed" ? "bg-success/10 text-success" :
                        agent.status === "running" ? "bg-primary/10 text-primary" :
                        "bg-foreground-muted/10 text-foreground-muted"
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
                </div>
                <div className="flex justify-between text-xs text-foreground-muted mt-1">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Teams</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              From startups to Fortune 500s, teams trust FlowMind for mission-critical automation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-surface border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-foreground-muted">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Start free, upgrade when you need more power. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border ${
                  plan.popular
                    ? "border-primary/50 bg-primary/5"
                    : "border-border bg-surface"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-foreground-muted mt-1">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-foreground-muted">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span className="text-foreground-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/register")}
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    plan.popular
                      ? "bg-primary hover:bg-primary-hover text-white"
                      : "bg-surface-elevated hover:bg-surface-hover border border-border"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-3xl bg-surface border border-border relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Automate Everything?
              </h2>
              <p className="text-foreground-muted max-w-xl mx-auto mb-8">
                Join thousands of teams using FlowMind to eliminate busywork and focus on what matters.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate("/dashboard/workflows/new")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 glass text-foreground px-8 py-3.5 rounded-xl font-semibold transition-all hover:bg-surface-hover"
                >
                  Try Live Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-5 h-5 text-primary" />
                <span className="font-bold">FlowMind</span>
              </div>
              <p className="text-sm text-foreground-muted">
                Autonomous multi-agent workflow automation for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">API</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">About</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Blog</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Careers</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Terms</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Security</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground-muted">
              © 2025 FlowMind AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Globe className="w-4 h-4 text-foreground-muted" />
              <Lock className="w-4 h-4 text-foreground-muted" />
              <Users className="w-4 h-4 text-foreground-muted" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
