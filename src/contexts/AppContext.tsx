import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface AppContextType {
    selectedFile: File | null;
    setSelectedFile: (file: File | null) => void;
    action: 'Encryption' | 'Decryption';
    setAction: (action: 'Encryption' | 'Decryption') => void;
    algorithms: string[];
    setAlgorithms: (algos: string[]) => void;

    keyFile?: File | null;
    setKeyFile: (file: File | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [keyFile, setKeyFile] = useState<File | null>(null);
    const [action, setAction] = useState<'Encryption' | 'Decryption'>('Encryption');
    const [algorithms, setAlgorithms] = useState<string[]>([]);

    const handleSetAction = (newAction: 'Encryption' | 'Decryption') => {
        setAction(newAction);
        if (newAction === 'Encryption') {
            setSelectedFile(null);
        }
    };

    const value = {
        selectedFile,
        setSelectedFile,
        action,
        setAction: handleSetAction,
        algorithms,
        setAlgorithms,
        keyFile,
        setKeyFile,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};