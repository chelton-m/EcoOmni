'use client';

import { useData } from '@/context/DataContext';
import EmptyState from '@/components/EmptyState';
import Dashboard from '@/components/Dashboard';
import FileImportModal from '@/components/FileImportModal';

export default function Home() {
  const { hasData, showImportModal } = useData();

  return (
    <>
      {hasData ? <Dashboard /> : <EmptyState />}
      {showImportModal && <FileImportModal />}
    </>
  );
}

