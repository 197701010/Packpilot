'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

// Data voor de beschikbare mockup-types
// We gebruiken nu weer placeholders. Deze kun je later vervangen door echte preview-afbeeldingen.
const mockupTypes = [
    { id: 'coffee-cup', name: 'Koffiebeker', img: 'https://placehold.co/400x400/F3F4F6/333?text=Koffiebeker' },
    { id: 'shipping-box', name: 'Verzenddoos', img: 'https://placehold.co/400x400/F3F4F6/333?text=Verzenddoos' },
    { id: 'soda-can', name: 'Drankblikje', img: 'https://placehold.co/400x400/F3F4F6/333?text=Drankblikje' },
    { id: 'cosmetic-jar', name: 'Cosmeticapot', img: 'https://placehold.co/400x400/F3F4F6/333?text=Cosmeticapot' },
    { id: 'tote-bag', name: 'Draagtas', img: 'https://placehold.co/400x400/F3F4F6/F3F4F6?text=Draagtas' },
    { id: 'book-cover', name: 'Boekomslag', img: 'https://placehold.co/400x400/F3F4F6/F3F4F6?text=Boekomslag' },
];

export default function MockupSelectionPage() {
    const router = useRouter();
    const [selectedMockup, setSelectedMockup] = useState(null);

    const handleNext = () => {
        if (selectedMockup) {
            // We sturen de gebruiker door naar de volgende stap met het ID van de gekozen mockup
            router.push(`/mockup/${selectedMockup}`);
        }
    };

    return (
        <main className="p-8 text-center">
            <h1 className="font-display text-4xl text-dark mt-2 mb-8">Kies je mockup</h1>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Selecteer een product om je ontwerp op te plaatsen. We genereren een realistische 3D-visualisatie van je design.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 max-w-6xl mx-auto">
                {mockupTypes.map(mockup => (
                    <div
                        key={mockup.id}
                        onClick={() => setSelectedMockup(mockup.id)}
                        className={`rounded-lg cursor-pointer border-2 transition-all overflow-hidden ${selectedMockup === mockup.id ? 'border-brand-primary ring-2 ring-brand-primary' : 'bg-white border-gray-200 hover:border-gray-400'}`}
                    >
                        <img src={mockup.img} alt={mockup.name} className="h-48 w-full object-cover bg-gray-100" />
                        <p className="font-semibold text-dark p-3 bg-white">{mockup.name}</p>
                    </div>
                ))}
            </div>

            <Button onClick={handleNext} disabled={!selectedMockup} size="lg">
                Volgende
            </Button>
        </main>
    );
}