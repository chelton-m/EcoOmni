'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextType {
  hasData: boolean;
  setHasData: (value: boolean) => void;
  showImportModal: boolean;
  setShowImportModal: (value: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [hasData, setHasData] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <DataContext.Provider
      value={{
        hasData,
        setHasData,
        showImportModal,
        setShowImportModal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

