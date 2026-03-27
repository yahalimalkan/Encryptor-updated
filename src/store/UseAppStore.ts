import { create } from 'zustand';
import { ENCRYPTION } from '../utils/Constants';

interface AppStore {
    mainFile: File | null;
    keyFile: File | null;
    algorithm: string[];
    action: string;

    setMainFile: (file: File | null) => void;
    setKeyFile: (file: File | null) => void;
    setAlgorithm: (algos: string[]) => void;
    setAction: (action: string) => void;
    reset: () => void;
}

export const UseAppStore = create<AppStore>((set) => ({
    mainFile: null,
    keyFile: null,
    algorithm: [],
    action: ENCRYPTION,

    setMainFile: (file) => set({ mainFile: file }),

    setKeyFile: (file) => set({ keyFile: file }),

    setAlgorithm: (algo) => set({ algorithm: algo }),

    setAction: (newAction) => set((state) => ({
        action: newAction,
        keyFile: newAction === ENCRYPTION ? null : state.keyFile
    })),

    reset: () => set({ mainFile: null, keyFile: null, algorithm: [], action: ENCRYPTION }),
}));