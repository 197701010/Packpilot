import React, { Suspense } from 'react';
import DesignPageClient from './DesignPageClient';

// Een simpele laad-indicator
function Loading() {
  return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
}

export default function DesignPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DesignPageClient />
    </Suspense>
  );
}