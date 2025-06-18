'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMockupContext } from '@/context/MockupContext'; // Gebruik onze context
import Button from '@/components/ui/Button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function MockupConfigurePage() {
    const router = useRouter();
    const { formData, updateFormData } = useMockupContext();
    const [isLoading, setIsLoading] = useState(false);

    // De handleSubmit functie heeft nu toegang tot ALLE data uit de 'rugzak'!
    const handleSubmit = async () => {
        setIsLoading(true);
        console.log("VOLLEDIGE DATA VERZAMELD:", formData);
        
        // We sturen nu alleen het eerste bestand en de eerste mockup voor de test
        const dataToSend = new FormData();
        dataToSend.append('file', formData.artworkFiles[0]);
        dataToSend.append('mockupId', formData.selectedProducts[0]);

        try {
            const response = await fetch('/api/mockup/create', { method: 'POST', body: dataToSend });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Fout bij het genereren.');
            
            // In een echte app zouden we nu doorsturen naar een resultatenpagina met deze afbeelding
            alert("Mockup succesvol gegenereerd! (Resultaat wordt nog niet getoond)");
            console.log("Resultaat URL:", result.imageUrl);

        } catch (error) {
            alert(`Fout: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="p-4 sm:p-8 bg-white min-h-full">
            <header className="max-w-5xl mx-auto mb-8">
                <p className="text-sm font-bold uppercase text-gray-500">Stap 3 van 3</p>
                <div className="flex justify-between items-center mt-2">
                    <Button variant="outline" onClick={() => router.back()} disabled={isLoading}><ArrowLeft className="mr-2 h-4 w-4"/>Terug</Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Genereren...</>) : ('Generate mockups')}
                    </Button>
                </div>
            </header>
            <div className="max-w-5xl mx-auto">
                <h1 className="font-display text-4xl text-center text-dark mb-8">Choose the number of images</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="font-semibold text-sm mb-2 block">Select the number of images per product</label>
                        <p className="text-xs text-gray-500">Each image costs 2 credits.</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
                            {[4, 5, 6, 7, 8, 9, 10].map(num => (
                                <button key={num} onClick={() => updateFormData('imageCount', num)} className={`p-4 rounded-lg font-semibold border-2 text-lg transition-colors ${formData.imageCount === num ? 'border-brand-primary bg-red-50' : 'bg-gray-100 border-transparent'}`}>
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}