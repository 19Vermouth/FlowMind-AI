import { create } from "zustand";

export type TaskStatus = "queued" | "running" | "completed" | "failed" | "cancelled";
export type AgentType = "planner" | "research" | "analysis" | "writer" | "verification";

export interface WorkflowTask {
  id: string;
  name: string;
  agentType: AgentType;
  status: TaskStatus;
  progress: number;
  startTime?: string;
  endTime?: string;
  logs: string[];
  output?: string;
  dependencies: string[];
}

export interface Workflow {
  id: string;
  title: string;
  prompt: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  progress: number;
  createdAt: string;
  updatedAt: string;
  tasks: WorkflowTask[];
  result?: string;
  artifacts: Artifact[];
  tokensUsed: number;
  duration?: number;
}

export interface Artifact {
  id: string;
  name: string;
  type: "markdown" | "pdf" | "csv" | "json" | "txt";
  size: string;
  url: string;
}

export interface AgentActivity {
  id: string;
  agentType: AgentType;
  message: string;
  timestamp: string;
  workflowId: string;
}

interface WorkflowState {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  activities: AgentActivity[];
  isCreating: boolean;
  createWorkflow: (prompt: string, file?: File) => Promise<Workflow>;
  cancelWorkflow: (id: string) => void;
  rerunWorkflow: (id: string) => Promise<void>;
  setCurrentWorkflow: (workflow: Workflow | null) => void;
  addActivity: (activity: AgentActivity) => void;
}

function createMockTasks(_prompt: string): WorkflowTask[] {
  const tasks: WorkflowTask[] = [
    {
      id: "task_1",
      name: "Analyze request & decompose",
      agentType: "planner",
      status: "queued",
      progress: 0,
      logs: [],
      dependencies: [],
    },
    {
      id: "task_2",
      name: "Gather research data",
      agentType: "research",
      status: "queued",
      progress: 0,
      logs: [],
      dependencies: ["task_1"],
    },
    {
      id: "task_3",
      name: "Analyze patterns & trends",
      agentType: "analysis",
      status: "queued",
      progress: 0,
      logs: [],
      dependencies: ["task_2"],
    },
    {
      id: "task_4",
      name: "Draft comprehensive report",
      agentType: "writer",
      status: "queued",
      progress: 0,
      logs: [],
      dependencies: ["task_3"],
    },
    {
      id: "task_5",
      name: "Verify accuracy & consistency",
      agentType: "verification",
      status: "queued",
      progress: 0,
      logs: [],
      dependencies: ["task_4"],
    },
  ];
  return tasks;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflows: [],
  currentWorkflow: null,
  activities: [],
  isCreating: false,

  createWorkflow: async (prompt: string, _file?: File) => {
    set({ isCreating: true });
    await new Promise((r) => setTimeout(r, 600));

    const workflow: Workflow = {
      id: "wf_" + Math.random().toString(36).substr(2, 9),
      title: prompt.slice(0, 60) + (prompt.length > 60 ? "..." : ""),
      prompt,
      status: "running",
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: createMockTasks(prompt),
      artifacts: [],
      tokensUsed: 0,
    };

    set((state) => ({
      workflows: [workflow, ...state.workflows],
      currentWorkflow: workflow,
      isCreating: false,
    }));

    // Simulate execution
    simulateWorkflowExecution(workflow.id, set, get);

    return workflow;
  },

  cancelWorkflow: (id: string) => {
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === id ? { ...w, status: "cancelled" as const } : w
      ),
      currentWorkflow:
        state.currentWorkflow?.id === id
          ? { ...state.currentWorkflow, status: "cancelled" as const }
          : state.currentWorkflow,
    }));
  },

  rerunWorkflow: async (id: string) => {
    const workflow = get().workflows.find((w) => w.id === id);
    if (!workflow) return;

    const resetWorkflow: Workflow = {
      ...workflow,
      status: "running",
      progress: 0,
      tasks: createMockTasks(workflow.prompt),
      result: undefined,
      artifacts: [],
      tokensUsed: 0,
      duration: undefined,
    };

    set((state) => ({
      workflows: state.workflows.map((w) => (w.id === id ? resetWorkflow : w)),
      currentWorkflow: resetWorkflow,
    }));

    simulateWorkflowExecution(id, set, get);
  },

  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),

  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities].slice(0, 100) })),
}));

function simulateWorkflowExecution(
  workflowId: string,
  set: any,
  get: any
) {
  const taskLogs: Record<string, string[]> = {
    task_1: [
      "Initializing planner agent...",
      "Parsing natural language request",
      "Identified 4 subtasks to execute",
      "Building dependency graph",
      "Execution plan ready",
    ],
    task_2: [
      "Initializing research agent...",
      "Querying knowledge base",
      "Fetching external data sources",
      "Processing 47 documents",
      "Extracting key insights",
      "Research phase complete",
    ],
    task_3: [
      "Initializing analysis agent...",
      "Loading research data",
      "Running comparative analysis",
      "Calculating metrics",
      "Identifying trends",
      "Analysis complete",
    ],
    task_4: [
      "Initializing writer agent...",
      "Structuring report outline",
      "Drafting executive summary",
      "Writing detailed sections",
      "Formatting output",
      "Report generation complete",
    ],
    task_5: [
      "Initializing verification agent...",
      "Checking factual consistency",
      "Validating data sources",
      "Reviewing structure",
      "Final quality check",
      "Verification complete",
    ],
  };

  const taskResults: Record<string, string> = {
    task_1: "Execution plan created with 4 specialist agents assigned",
    task_2: "Gathered data from 47 sources across web, APIs, and internal knowledge base",
    task_3: "Completed trend analysis with 12 key metrics and 5 strategic insights",
    task_4: "Generated comprehensive 3,200-word report with structured sections",
    task_5: "All facts verified. 2 minor corrections applied. Report approved.",
  };

  let currentTaskIndex = 0;
  const tasks = ["task_1", "task_2", "task_3", "task_4", "task_5"];
  const startTime = Date.now();

  const runNextTask = () => {
    if (currentTaskIndex >= tasks.length) {
      const duration = Date.now() - startTime;
      const result = generateResult(workflowId);
      set((state: any) => ({
        workflows: state.workflows.map((w: Workflow) =>
          w.id === workflowId
            ? {
                ...w,
                status: "completed",
                progress: 100,
                result,
                duration,
                tokensUsed: 2847 + Math.floor(Math.random() * 5000),
                artifacts: [
                  {
                    id: "art_1",
                    name: "report.md",
                    type: "markdown" as const,
                    size: "12.4 KB",
                    url: "#",
                  },
                  {
                    id: "art_2",
                    name: "data_analysis.json",
                    type: "json" as const,
                    size: "3.2 KB",
                    url: "#",
                  },
                ],
              }
            : w
        ),
        currentWorkflow:
          state.currentWorkflow?.id === workflowId
            ? {
                ...state.currentWorkflow,
                status: "completed",
                progress: 100,
                result,
                duration,
                tokensUsed: 2847 + Math.floor(Math.random() * 5000),
                artifacts: [
                  {
                    id: "art_1",
                    name: "report.md",
                    type: "markdown" as const,
                    size: "12.4 KB",
                    url: "#",
                  },
                  {
                    id: "art_2",
                    name: "data_analysis.json",
                    type: "json" as const,
                    size: "3.2 KB",
                    url: "#",
                  },
                ],
              }
            : state.currentWorkflow,
      }));
      return;
    }

    const taskId = tasks[currentTaskIndex];
    const logs = taskLogs[taskId];
    let logIndex = 0;

    // Set task to running
    set((state: any) => {
      const updateWorkflow = (w: Workflow) => {
        if (w.id !== workflowId) return w;
        const newTasks = w.tasks.map((t) =>
          t.id === taskId
            ? { ...t, status: "running" as const, startTime: new Date().toISOString() }
            : t.id === tasks[currentTaskIndex - 1]
            ? { ...t, status: "completed" as const, endTime: new Date().toISOString() }
            : t
        );
        return { ...w, tasks: newTasks };
      };
      return {
        workflows: state.workflows.map(updateWorkflow),
        currentWorkflow: state.currentWorkflow
          ? updateWorkflow(state.currentWorkflow)
          : null,
      };
    });

    // Add activity
    get().addActivity({
      id: "act_" + Math.random().toString(36).substr(2, 9),
      agentType: ["planner", "research", "analysis", "writer", "verification"][
        currentTaskIndex
      ] as AgentType,
      message: `Started ${["planning", "research", "analysis", "writing", "verification"][currentTaskIndex]} phase`,
      timestamp: new Date().toISOString(),
      workflowId,
    });

    // Simulate logs
    const logInterval = setInterval(() => {
      if (logIndex >= logs.length) {
        clearInterval(logInterval);
        // Complete task
        set((state: any) => {
          const updateWorkflow = (w: Workflow) => {
            if (w.id !== workflowId) return w;
            const newTasks = w.tasks.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    status: "completed" as const,
                    progress: 100,
                    endTime: new Date().toISOString(),
                    logs: [...t.logs, ...logs],
                    output: taskResults[taskId],
                  }
                : t
            );
            const completedCount = newTasks.filter(
              (t) => t.status === "completed"
            ).length;
            return {
              ...w,
              tasks: newTasks,
              progress: Math.round((completedCount / newTasks.length) * 100),
            };
          };
          return {
            workflows: state.workflows.map(updateWorkflow),
            currentWorkflow: state.currentWorkflow
              ? updateWorkflow(state.currentWorkflow)
              : null,
          };
        });

        currentTaskIndex++;
        setTimeout(runNextTask, 400);
        return;
      }

      set((state: any) => {
        const updateWorkflow = (w: Workflow) => {
          if (w.id !== workflowId) return w;
          const newTasks = w.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  logs: [...t.logs, logs[logIndex]],
                  progress: Math.round(((logIndex + 1) / logs.length) * 100),
                }
              : t
          );
          return { ...w, tasks: newTasks };
        };
        return {
          workflows: state.workflows.map(updateWorkflow),
          currentWorkflow: state.currentWorkflow
            ? updateWorkflow(state.currentWorkflow)
            : null,
        };
      });

      logIndex++;
    }, 600);
  };

  setTimeout(runNextTask, 500);
}

function generateResult(workflowId: string): string {
  return `# Executive Summary

## Overview
This comprehensive analysis was generated through collaborative multi-agent orchestration, leveraging specialized AI agents for research, analysis, writing, and verification.

## Key Findings

### 1. Market Landscape
- **Total Addressable Market**: $47.2B (CAGR 23.4%)
- **Key Players**: 12 major incumbents, 34 emerging startups
- **Regulatory Environment**: Favorable with 3 new policy frameworks

### 2. Competitive Analysis
| Company | Market Share | Growth Rate | Strength |
|---------|-------------|-------------|----------|
| Leader A | 28% | 15% | Brand recognition |
| Challenger B | 19% | 42% | Innovation pipeline |
| Startup C | 4% | 180% | Niche disruption |

### 3. Strategic Recommendations
1. **Immediate**: Focus on underserved mid-market segment
2. **Short-term**: Develop partnership ecosystem
3. **Long-term**: Build proprietary data moat

### 4. Risk Assessment
- **High**: Regulatory changes in EU markets
- **Medium**: Talent acquisition competition
- **Low**: Technology obsolescence

## Conclusion
The analysis reveals significant opportunity in the target market with clear pathways to capture 8-12% market share within 24 months through focused execution of the recommended strategy.

---
*Generated by FlowMind AI Multi-Agent System*
*Workflow ID: ${workflowId}*
`;
}
