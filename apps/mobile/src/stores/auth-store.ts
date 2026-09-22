import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  setTokens: (accessToken: string, refreshToken: string, userId: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  userId: null,
  setTokens: (accessToken, refreshToken, userId) =>
    set({ accessToken, refreshToken, userId }),
  clear: () => set({ accessToken: null, refreshToken: null, userId: null }),
}));
