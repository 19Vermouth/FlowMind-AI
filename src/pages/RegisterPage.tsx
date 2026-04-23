import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BrainCircuit, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 mb-4">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-foreground-muted text-sm">
            Start automating with AI agents today
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Chen"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-danger bg-danger/10 px-3 py-2 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white py-2.5 rounded-lg font-medium text-sm transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>14-day free trial, no credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-foreground-muted">Already have an account? </span>
            <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
