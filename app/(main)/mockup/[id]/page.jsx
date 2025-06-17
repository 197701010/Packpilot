'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { UploadCloud, ArrowLeft } from 'lucide-react';

// We definiëren hier opnieuw de mockup data, zodat we de naam kunnen opzoeken.
// Later kan dit uit een centrale plek komen.
const mockupTypes = [
    { id: 'coffee-cup', name: 'Koffiebeker', img: '...' },
    { id: 'shipping-box', name: 'Verzenddoos', img: '...' },
    { id: 'soda-can', name: 'Drankblikje', img: '...' },
    { id: 'cosmetic-jar', name: 'Cosmeticapot', img: '...' },
    { id: 'tote-bag', name: 'Draagtas', img: '...' },
    { id: 'book-cover', name: 'Boekomslag', img: '...' },
];

export default function MockupUploadPage() {
    const router = useRouter();
    const params = useParams(); // Leest de ID uit de URL, bv. { id: 'coffee-cup' }
    
    const [mockupInfo, setMockupInfo] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    // Zoek de info van de geselecteerde mockup zodra de pagina laadt
    useEffect(() => {
        if (params.id) {
            const info = mockupTypes.find(m => m.id === params.id);
            setMockupInfo(info);
        }
    }, [params.id]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleSubmit = () => {
        if (!uploadedFile) {
            alert("Selecteer alsjeblieft eerst een bestand om te uploaden.");
            return;
        }

        // Voor nu loggen we de data. Later sturen we dit naar de backend.
        console.log({
            mockupId: mockupInfo.id,
            mockupName: mockupInfo.name,
            fileName: uploadedFile.name,
            fileSize: uploadedFile.size,
        });

        alert(`Klaar om mockup te genereren voor ${mockupInfo.name} met het bestand ${uploadedFile.name}! Check de console.`);
    };

    if (!mockupInfo) {
        return <div className="p-8 text-center">Mockup-type laden...</div>;
    }

    return (
        <main className="p-8 flex items-center justify-center bg-subtle min-h-full">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md border">
                <h1 className="font-display text-3xl text-center text-dark mb-2">
                    Upload je design voor: <span className="text-brand-primary">{mockupInfo.name}</span>
                </h1>
                <p className="text-center text-gray-500 mb-8">Sleep je bestand hieronder of selecteer het van je computer.</p>

                <div className="mt-6">
                    <label 
                        htmlFor="file-upload" 
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                        {uploadedFile ? (
                            <span className="font-semibold text-green-600">{uploadedFile.name} geselecteerd!</span>
                        ) : (
                            <span className="text-gray-500">Klik om te uploaden of sleep je bestand hier</span>
                        )}
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG (MAX. 10MB)</p>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                </div>

                <div className="flex justify-between items-center mt-8">
                    <Button onClick={() => router.back()} variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4"/> Terug
                    </Button>
                    <Button onClick={handleSubmit} disabled={!uploadedFile}>
                        Genereer Mockup
                    </Button>
                </div>
            </div>
        </main>
    );
}