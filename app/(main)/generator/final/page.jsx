import React, { Suspense } from 'react';
import FinalPageClient from './FinalPageClient';

function Loading() {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
}

export default function FinalPage() {
    return (
        <Suspense fallback={<Loading />}>
            <FinalPageClient />
        </Suspense>
    );
}