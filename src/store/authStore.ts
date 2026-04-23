import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: "free" | "pro" | "enterprise";
  tokensUsed: number;
  tokensLimit: number;
  workflowsUsed: number;
  workflowsLimit: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const mockUser: User = {
  id: "usr_001",
  email: "founder@flowmind.ai",
  name: "Alex Chen",
  plan: "pro",
  tokensUsed: 2847500,
  tokensLimit: 5000000,
  workflowsUsed: 127,
  workflowsLimit: 500,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        set({ user: { ...mockUser, email }, isAuthenticated: true, isLoading: false });
      },
      register: async (name: string, email: string, _password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1000));
        set({
          user: {
            id: "usr_" + Math.random().toString(36).substr(2, 9),
            email,
            name,
            plan: "free",
            tokensUsed: 0,
            tokensLimit: 100000,
            workflowsUsed: 0,
            workflowsLimit: 10,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    { name: "flowmind-auth" }
  )
);
