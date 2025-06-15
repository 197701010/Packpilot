import React, { Suspense } from 'react';
import ResultsPageClient from './ResultsPageClient';

function Loading() {
  return <div className="min-h-screen flex items-center justify-center">Resultaten laden...</div>;
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ResultsPageClient />
        </Suspense>
    );
}