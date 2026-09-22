import { create } from 'zustand';

type ChatState = {
  roomId: string | null;
  sessionId: string | null;
  expiresAt: number | null;
  setRoom: (roomId: string, sessionId: string, expiresAt: number) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  roomId: null,
  sessionId: null,
  expiresAt: null,
  setRoom: (roomId, sessionId, expiresAt) => set({ roomId, sessionId, expiresAt }),
  clear: () => set({ roomId: null, sessionId: null, expiresAt: null }),
}));
