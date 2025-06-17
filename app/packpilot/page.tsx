'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button'; // De correcte import

export default function PackPilotPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white py-12 px-6 flex flex-col items-center justify-center text-center">
            {/* Titel en subtitel met de juiste merkkleuren en lettertypes */}
            <h1 className="font-display text-5xl md:text-6xl font-bold text-dark mb-4">
                De AI-toolkit voor verpakkingsdesign
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mb-10">
                Ontwerp sneller, slimmer en consistenter met AI. Moodboards, mockups en bewerking in één platform.
            </p>

            {/* Knoppen die onze verbeterde Button component gebruiken */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Button 
                    size="lg" 
                    onClick={() => router.push('/aanvraag')}
                >
                    Probeer gratis
                </Button>
                <Button 
                    variant="outline" // Hier gebruiken we de nieuwe 'outline' variant!
                    size="lg" 
                    onClick={() => router.push('/login')}
                >
                    Inloggen / Registreren
                </Button>
            </div>

            {/* Placeholder voor de feature-sectie */}
            <div className="text-gray-400">
                (Hier komt de sectie met de features)
            </div>
        </main>
    );
}