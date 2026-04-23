import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send,
  Paperclip,
  X,
  FileText,
  Loader2,
  Sparkles,
  Zap,
  Lightbulb,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";
import { useWorkflowStore } from "../store/workflowStore";

const suggestions = [
  {
    icon: Zap,
    title: "Market Research",
    prompt: "Research top EV startups in India and generate a comprehensive investor report",
  },
  {
    icon: BarChart3,
    title: "Competitive Analysis",
    prompt: "Analyze competitor pricing and create a strategy memo with recommendations",
  },
  {
    icon: FileText,
    title: "Support Analysis",
    prompt: "Summarize 50 support tickets and suggest product improvements",
  },
  {
    icon: FileSpreadsheet,
    title: "Sales Report",
    prompt: "Generate weekly sales report from uploaded CSV with trend analysis",
  },
  {
    icon: Lightbulb,
    title: "Content Strategy",
    prompt: "Create a 90-day content marketing strategy for a B2B SaaS startup",
  },
  {
    icon: Sparkles,
    title: "Due Diligence",
    prompt: "Perform technical due diligence on a target acquisition company",
  },
];

export default function NewWorkflowPage() {
  const navigate = useNavigate();
  const { createWorkflow, isCreating } = useWorkflowStore();
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isCreating) return;
    const workflow = await createWorkflow(prompt, file || undefined);
    navigate(`/dashboard/workflows/${workflow.id}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 pb-0">
        <h1 className="text-2xl font-bold">New Workflow</h1>
        <p className="text-foreground-muted text-sm mt-1">
          Describe what you want automated — our agents will handle the rest
        </p>
      </div>

      {/* Main Input Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          {/* Prompt Box */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="rounded-2xl bg-surface border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all overflow-hidden">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What do you want automated?"
                rows={4}
                className="w-full px-5 pt-4 pb-16 bg-transparent text-foreground placeholder:text-foreground-subtle focus:outline-none resize-none text-base leading-relaxed"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".csv,.pdf,.txt,.json,.md"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                    Attach file
                  </button>
                  {file && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs">
                      <FileText className="w-3.5 h-3.5" />
                      {file.name}
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="ml-1 hover:text-danger transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!prompt.trim() || isCreating}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium text-sm transition-all"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Planning...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Run Workflow
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Suggestions */}
          <div className="mt-8">
            <p className="text-sm text-foreground-muted mb-4">Or try one of these:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {suggestions.map((suggestion, i) => (
                <motion.button
                  key={suggestion.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => setPrompt(suggestion.prompt)}
                  className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border hover:border-primary/30 hover:bg-surface-hover transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <suggestion.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{suggestion.title}</p>
                    <p className="text-xs text-foreground-muted mt-1 line-clamp-2">
                      {suggestion.prompt}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
