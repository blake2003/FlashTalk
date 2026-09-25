import { create } from 'zustand';

type MatchingStatus = 'IDLE' | 'QUEUED' | 'MATCHED' | 'CANCELLED';

type MatchingState = {
  status: MatchingStatus;
  mode: 'RANDOM' | 'INTEREST' | null;
  setStatus: (status: MatchingStatus) => void;
  setMode: (mode: MatchingState['mode']) => void;
  reset: () => void;
};

export const useMatchingStore = create<MatchingState>((set) => ({
  status: 'IDLE',
  mode: null,
  setStatus: (status) => set({ status }),
  setMode: (mode) => set({ mode }),
  reset: () => set({ status: 'IDLE', mode: null }),
}));
