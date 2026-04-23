import { Workflow, AgentActivity } from "../store/workflowStore";

export const mockWorkflows: Workflow[] = [
  {
    id: "wf_001",
    title: "Research top EV startups in India and generate investor report",
    prompt: "Research top EV startups in India and generate investor report",
    status: "completed",
    progress: 100,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2 + 45000).toISOString(),
    tasks: [
      { id: "t1", name: "Analyze request", agentType: "planner", status: "completed", progress: 100, logs: ["Plan created"], dependencies: [] },
      { id: "t2", name: "Research EV startups", agentType: "research", status: "completed", progress: 100, logs: ["Found 23 startups"], dependencies: ["t1"] },
      { id: "t3", name: "Analyze market data", agentType: "analysis", status: "completed", progress: 100, logs: ["Analysis complete"], dependencies: ["t2"] },
      { id: "t4", name: "Write report", agentType: "writer", status: "completed", progress: 100, logs: ["Report drafted"], dependencies: ["t3"] },
      { id: "t5", name: "Verify report", agentType: "verification", status: "completed", progress: 100, logs: ["Verified"], dependencies: ["t4"] },
    ],
    result: "# EV Startups in India - Investor Report\n\n## Key Findings...",
    artifacts: [
      { id: "a1", name: "ev_report.md", type: "markdown", size: "24.1 KB", url: "#" },
      { id: "a2", name: "market_data.json", type: "json", size: "8.3 KB", url: "#" },
    ],
    tokensUsed: 4521,
    duration: 42000,
  },
  {
    id: "wf_002",
    title: "Analyze competitor pricing and create strategy memo",
    prompt: "Analyze competitor pricing and create strategy memo",
    status: "completed",
    progress: 100,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 + 38000).toISOString(),
    tasks: [
      { id: "t1", name: "Analyze request", agentType: "planner", status: "completed", progress: 100, logs: [], dependencies: [] },
      { id: "t2", name: "Research competitors", agentType: "research", status: "completed", progress: 100, logs: [], dependencies: ["t1"] },
      { id: "t3", name: "Price analysis", agentType: "analysis", status: "completed", progress: 100, logs: [], dependencies: ["t2"] },
      { id: "t4", name: "Draft memo", agentType: "writer", status: "completed", progress: 100, logs: [], dependencies: ["t3"] },
      { id: "t5", name: "Verify memo", agentType: "verification", status: "completed", progress: 100, logs: [], dependencies: ["t4"] },
    ],
    result: "# Competitive Pricing Strategy Memo\n\n## Executive Summary...",
    artifacts: [
      { id: "a1", name: "pricing_memo.md", type: "markdown", size: "18.7 KB", url: "#" },
    ],
    tokensUsed: 3210,
    duration: 38000,
  },
  {
    id: "wf_003",
    title: "Summarize 50 support tickets and suggest improvements",
    prompt: "Summarize 50 support tickets and suggest improvements",
    status: "completed",
    progress: 100,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000 + 29000).toISOString(),
    tasks: [
      { id: "t1", name: "Analyze request", agentType: "planner", status: "completed", progress: 100, logs: [], dependencies: [] },
      { id: "t2", name: "Process tickets", agentType: "research", status: "completed", progress: 100, logs: [], dependencies: ["t1"] },
      { id: "t3", name: "Categorize issues", agentType: "analysis", status: "completed", progress: 100, logs: [], dependencies: ["t2"] },
      { id: "t4", name: "Write summary", agentType: "writer", status: "completed", progress: 100, logs: [], dependencies: ["t3"] },
      { id: "t5", name: "Verify summary", agentType: "verification", status: "completed", progress: 100, logs: [], dependencies: ["t4"] },
    ],
    result: "# Support Ticket Analysis\n\n## Top Issues...",
    artifacts: [
      { id: "a1", name: "ticket_summary.md", type: "markdown", size: "15.2 KB", url: "#" },
      { id: "a2", name: "improvements.csv", type: "csv", size: "2.1 KB", url: "#" },
    ],
    tokensUsed: 2890,
    duration: 29000,
  },
];

export const mockActivities: AgentActivity[] = [
  { id: "act_1", agentType: "planner", message: "Created execution plan for EV research workflow", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), workflowId: "wf_001" },
  { id: "act_2", agentType: "research", message: "Gathered data from 47 sources", timestamp: new Date(Date.now() - 86400000 * 2 + 5000).toISOString(), workflowId: "wf_001" },
  { id: "act_3", agentType: "analysis", message: "Identified 5 key market trends", timestamp: new Date(Date.now() - 86400000 * 2 + 12000).toISOString(), workflowId: "wf_001" },
  { id: "act_4", agentType: "writer", message: "Generated 3,200-word investor report", timestamp: new Date(Date.now() - 86400000 * 2 + 25000).toISOString(), workflowId: "wf_001" },
  { id: "act_5", agentType: "verification", message: "Verified all facts, 2 minor corrections applied", timestamp: new Date(Date.now() - 86400000 * 2 + 40000).toISOString(), workflowId: "wf_001" },
  { id: "act_6", agentType: "planner", message: "Decomposed pricing analysis into 4 subtasks", timestamp: new Date(Date.now() - 86400000).toISOString(), workflowId: "wf_002" },
  { id: "act_7", agentType: "research", message: "Analyzed 8 competitor pricing pages", timestamp: new Date(Date.now() - 86400000 + 6000).toISOString(), workflowId: "wf_002" },
  { id: "act_8", agentType: "analysis", message: "Found 3 pricing gaps in market", timestamp: new Date(Date.now() - 86400000 + 15000).toISOString(), workflowId: "wf_002" },
];

export const usageData = [
  { date: "Mon", workflows: 3, tokens: 45000 },
  { date: "Tue", workflows: 5, tokens: 72000 },
  { date: "Wed", workflows: 2, tokens: 28000 },
  { date: "Thu", workflows: 8, tokens: 115000 },
  { date: "Fri", workflows: 6, tokens: 89000 },
  { date: "Sat", workflows: 4, tokens: 56000 },
  { date: "Sun", workflows: 1, tokens: 12000 },
];

export const agentStats = [
  { name: "Research", runs: 342, avgTime: "12.4s", success: 98.2 },
  { name: "Analysis", runs: 298, avgTime: "8.7s", success: 99.1 },
  { name: "Writer", runs: 287, avgTime: "15.2s", success: 97.8 },
  { name: "Verification", runs: 287, avgTime: "6.3s", success: 99.5 },
  { name: "Planner", runs: 312, avgTime: "3.1s", success: 99.8 },
];
