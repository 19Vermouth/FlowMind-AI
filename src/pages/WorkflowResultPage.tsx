import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  RotateCcw,
  FileText,
  FileJson,
  CheckCircle2,
  Clock,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { useWorkflowStore } from "../store/workflowStore";
import { mockWorkflows } from "../lib/mockData";
import { formatDuration } from "../lib/utils";
import { useState } from "react";

export default function WorkflowResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { workflows, currentWorkflow, setCurrentWorkflow, rerunWorkflow } = useWorkflowStore();
  const [copied, setCopied] = useState(false);

  const workflow = currentWorkflow || workflows.find((w) => w.id === id) || mockWorkflows.find((w) => w.id === id);

  useEffect(() => {
    if (workflow) setCurrentWorkflow(workflow);
  }, [workflow, setCurrentWorkflow]);

  const handleCopy = () => {
    if (workflow?.result) {
      navigator.clipboard.writeText(workflow.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/dashboard/workflows/${workflow.id}`)}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Result</h1>
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <span>{workflow.title}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-surface-elevated border border-border hover:bg-surface-hover transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={() => rerunWorkflow(workflow.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-surface-elevated border border-border hover:bg-surface-hover transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Rerun
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20 mb-6"
          >
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div className="flex-1">
              <p className="text-sm font-medium text-success">Workflow completed successfully</p>
              <p className="text-xs text-foreground-muted mt-0.5">
                Completed in {workflow.duration ? formatDuration(workflow.duration) : "--"} ·{" "}
                {workflow.tokensUsed.toLocaleString()} tokens · {workflow.tasks.length} tasks executed
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Result */}
            <div className="lg:col-span-3">
              <div className="p-6 rounded-xl bg-surface border border-border">
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {workflow.result || "No result available."}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Artifacts */}
              <div className="p-4 rounded-xl bg-surface border border-border">
                <h3 className="text-sm font-semibold mb-3">Artifacts</h3>
                {workflow.artifacts.length === 0 ? (
                  <p className="text-xs text-foreground-muted">No artifacts generated</p>
                ) : (
                  <div className="space-y-2">
                    {workflow.artifacts.map((artifact) => (
                      <div
                        key={artifact.id}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-elevated hover:bg-surface-hover transition-colors cursor-pointer group"
                      >
                        {artifact.type === "markdown" ? (
                          <FileText className="w-4 h-4 text-primary" />
                        ) : (
                          <FileJson className="w-4 h-4 text-accent" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{artifact.name}</p>
                          <p className="text-xs text-foreground-muted">{artifact.size}</p>
                        </div>
                        <Download className="w-3.5 h-3.5 text-foreground-subtle group-hover:text-foreground transition-colors" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Task Summary */}
              <div className="p-4 rounded-xl bg-surface border border-border">
                <h3 className="text-sm font-semibold mb-3">Task Summary</h3>
                <div className="space-y-2">
                  {workflow.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                      <span className="text-xs flex-1">{task.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="p-4 rounded-xl bg-surface border border-border">
                <h3 className="text-sm font-semibold mb-3">Metadata</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Workflow ID</span>
                    <span className="font-mono">{workflow.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Status</span>
                    <span className="text-success">Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Duration</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {workflow.duration ? formatDuration(workflow.duration) : "--"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Tokens</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {workflow.tokensUsed.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
