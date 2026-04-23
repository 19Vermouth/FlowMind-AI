import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BrainCircuit, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
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
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-foreground-muted text-sm">
            Sign in to your FlowMind account
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-foreground-muted">Don't have an account? </span>
            <Link to="/register" className="text-primary hover:text-primary-hover font-medium transition-colors">
              Get started
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
