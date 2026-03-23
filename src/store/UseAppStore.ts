import { create } from 'zustand';
import { ENCRYPTION } from '../utils/Constants';

// הגדרת ה-Type של ה-State (כמו Interface ב-Java)
interface AppStore {
    // נתונים (Data)
    mainFile: File | null;
    keyFile: File | null;
    algorithm: string[];
    action: string;

    // פעולות (Actions/Methods)
    setMainFile: (file: File | null) => void;
    setKeyFile: (file: File | null) => void;
    setAlgorithm: (algos: string[]) => void;
    setAction: (action: string) => void;
    reset: () => void; // איפוס המחסן
}

// יצירת המחסן בפועל
export const UseAppStore = create<AppStore>((set) => ({
    // ערכים ראשוניים
    mainFile: null,
    keyFile: null,
    algorithm: [], // ברירת מחדל
    action: ENCRYPTION,

    // מימוש הפעולות
    setMainFile: (file) => set({ mainFile: file }),

    setKeyFile: (file) => set({ keyFile: file }),

    setAlgorithm: (algo) => set({ algorithm: algo }),

    setAction: (newAction) => set((state) => ({
        action: newAction,
        // לוגיקה עסקית: אם עוברים להצפנה, מוחקים את קובץ המפתח הישן
        keyFile: newAction === ENCRYPTION ? null : state.keyFile
    })),

    reset: () => set({ mainFile: null, keyFile: null, algorithm: [], action: ENCRYPTION }),
}));