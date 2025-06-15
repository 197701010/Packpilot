import React, { Suspense } from 'react';
import ColorPageClient from './ColorPageClient';

function Loading() {
  return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
}

export default function GeneratorColorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ColorPageClient />
    </Suspense>
  );
}