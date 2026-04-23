import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import WorkflowsPage from "./pages/WorkflowsPage";
import NewWorkflowPage from "./pages/NewWorkflowPage";
import WorkflowExecutionPage from "./pages/WorkflowExecutionPage";
import WorkflowResultPage from "./pages/WorkflowResultPage";
import BillingPage from "./pages/BillingPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardLayout from "./components/layout/DashboardLayout";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="workflows" element={<WorkflowsPage />} />
        <Route path="workflows/new" element={<NewWorkflowPage />} />
        <Route path="workflows/:id" element={<WorkflowExecutionPage />} />
        <Route path="workflows/:id/result" element={<WorkflowResultPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
