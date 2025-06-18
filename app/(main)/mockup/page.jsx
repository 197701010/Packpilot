'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMockupContext } from '@/context/MockupContext'; // Gebruik onze context
import Button from '@/components/ui/Button';
import { UploadCloud, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export default function MockupUploadStepPage() {
    const router = useRouter();
    // Lokale state is weg, we gebruiken nu de gedeelde state uit de context!
    const { formData, updateFormData } = useMockupContext();

    const onDrop = useCallback(acceptedFiles => {
        const filesWithPreviews = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        // Update de gedeelde state
        updateFormData('artworkFiles', [...formData.artworkFiles, ...filesWithPreviews]);
    }, [formData.artworkFiles, updateFormData]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] }
    });

    const removeFile = (fileName) => {
        const newFiles = formData.artworkFiles.filter(file => file.name !== fileName);
        updateFormData('artworkFiles', newFiles);
    };

    return (
        <main className="p-4 sm:p-8 bg-white min-h-full">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-8">
                    <p className="text-sm font-bold uppercase text-gray-500">Stap 1 van 3</p>
                    <h1 className="font-display text-4xl text-dark mt-2">Upload je artwork</h1>
                    <p className="text-lg text-gray-600 mt-2">Sleep je bestanden hieronder, of klik om te selecteren.</p>
                </header>
                <div {...getRootProps()} className={`w-full border-2 border-dashed rounded-xl transition-colors ${isDragActive ? 'border-brand-primary bg-red-50' : 'border-gray-300 bg-white'}`}>
                    <input {...getInputProps()} />
                    <div className="p-8 text-center cursor-pointer"><UploadCloud className="mx-auto w-12 h-12 text-gray-400 mb-4" /><p className="font-semibold text-dark">Klik om te uploaden of sleep je bestanden hier</p><p className="text-sm text-gray-500">Ondersteunde formaten: JPG, PNG, WEBP</p></div>
                </div>
                {formData.artworkFiles.length > 0 && (
                    <div className="mt-8">
                        <h2 className="font-semibold text-lg">Geselecteerde bestanden:</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                            {formData.artworkFiles.map(file => (
                                <div key={file.name} className="relative group border rounded-lg overflow-hidden">
                                    <img src={file.preview} alt={file.name} className="w-full h-32 object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">{file.name}</div>
                                    <button onClick={() => removeFile(file.name)} className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full p-1 text-dark opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-end mt-12">
                    <Button onClick={() => router.push('/mockup/select-packaging')} disabled={formData.artworkFiles.length === 0} size="lg">Volgende</Button>
                </div>
            </div>
        </main>
    );
}