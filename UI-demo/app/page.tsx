'use client';

import { useData } from '@/context/DataContext';
import EmptyState from '@/components/EmptyState';
import ScrollableDashboard from '@/components/ScrollableDashboard';
import FileImportModal from '@/components/FileImportModal';

export default function Home() {
  const { hasData, showImportModal } = useData();

  return (
    <>
      {hasData ? <ScrollableDashboard /> : (
        <>
          <EmptyState />
          <div id="demo-dashboard">
            <ScrollableDashboard />
          </div>
        </>
      )}
      {showImportModal && <FileImportModal />}
    </>
  );
}

