'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { UploadCloud, ArrowLeft, Loader2 } from 'lucide-react';

// We definiëren hier opnieuw de mockup data, zodat we de naam kunnen opzoeken.
const mockupTypes = [
    { id: 'coffee-cup', name: 'Koffiebeker' },
    { id: 'shipping-box', name: 'Verzenddoos' },
    { id: 'soda-can', name: 'Drankblikje' },
    { id: 'cosmetic-jar', name: 'Cosmeticapot' },
    { id: 'tote-bag', name: 'Draagtas' },
    { id: 'book-cover', name: 'Boekomslag' },
];

export default function MockupUploadPage() {
    const router = useRouter();
    const params = useParams();
    
    const [mockupInfo, setMockupInfo] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [resultImage, setResultImage] = useState(null);

    useEffect(() => {
        if (params.id) {
            const info = mockupTypes.find(m => m.id === params.id);
            setMockupInfo(info);
        }
    }, [params.id]);

    const handleFileChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setResultImage(null); // Reset vorig resultaat bij nieuwe upload
            setUploadedFile(file);
        }
    };

    const handleSubmit = async () => {
        if (!uploadedFile) { return alert("Selecteer een bestand."); }
        setIsLoading(true);
        setResultImage(null);

        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('mockupId', mockupInfo.id);

        try {
            const response = await fetch('/api/mockup/create', { method: 'POST', body: formData });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Fout bij het genereren van de mockup.');
            }
            const data = await response.json();
            setResultImage(data.imageUrl);

        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!mockupInfo) {
        return <div className="p-8 text-center">Mockup-type laden...</div>;
    }

    return (
        <main className="p-8 flex flex-col items-center justify-start bg-subtle min-h-full space-y-8">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border">
                <h1 className="font-display text-3xl text-center text-dark mb-2">
                    Upload je design voor: <span className="text-brand-primary">{mockupInfo.name}</span>
                </h1>
                <p className="text-center text-gray-500 mb-8">Sleep je bestand hieronder of selecteer het van je computer.</p>

                {/* HIER IS DE VOLLEDIGE CODE VOOR DE UPLOAD-ZONE */}
                <div className="mt-6">
                    <label 
                        htmlFor="file-upload" 
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                        {uploadedFile ? (
                            <span className="font-semibold text-green-600 break-all px-4">{uploadedFile.name} geselecteerd!</span>
                        ) : (
                            <span className="text-gray-500">Klik om te uploaden of sleep je bestand hier</span>
                        )}
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG (MAX. 10MB)</p>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} disabled={isLoading} />
                    </label>
                </div>

                <div className="flex justify-between items-center mt-8">
                    <Button onClick={() => router.back()} variant="outline" disabled={isLoading}>
                        <ArrowLeft className="mr-2 h-4 w-4"/> Terug
                    </Button>
                    <Button onClick={handleSubmit} disabled={!uploadedFile || isLoading}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verwerken...</>
                        ) : (
                            'Genereer Mockup'
                        )}
                    </Button>
                </div>
            </div>

            {/* Hier wordt het resultaat getoond */}
            {resultImage && (
                <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border">
                    <h2 className="font-display text-3xl text-center text-dark mb-4">Je Resultaat!</h2>
                    <img src={resultImage} alt="Gegenereerde mockup" className="w-full h-auto rounded-lg border" />
                </div>
            )}
        </main>
    );
}