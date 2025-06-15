"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExtractorPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);

    // Navigeer naar een (toekomstige) resultatenpagina na het selecteren van een bestand
    const handleFileSelect = (file) => {
        if (!file) return;
        // Simulatie: in een echte app upload je het bestand en krijg je een ID terug.
        // Nu sturen we de gebruiker direct door naar een voorbeeld resultatenpagina.
        console.log("Bestand geselecteerd voor extractie:", file.name);
        router.push('/extractor/results/123'); // 123 is een voorbeeld-ID
    };

    // Drag & Drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    return (
        <main className="w-full p-8">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900">Image Extractor</h1>
                <p className="text-lg text-gray-500 mt-2">Upload an image to extract elements like backgrounds or color palettes.</p>
            </div>
            
            <div className="max-w-3xl">
                 <label 
                    htmlFor="file-upload"
                    className={`flex flex-col items-center justify-center w-full h-96 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isDragging ? 'border-purple-600 bg-purple-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <p className="mb-2 text-lg text-gray-600"><span className="font-semibold text-purple-600">Click to upload an image</span></p>
                        <p className="text-sm text-gray-500">or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-6">PNG, JPG, JPEG, WEBP up to 10MB</p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" onChange={(e) => handleFileSelect(e.target.files[0])} />
                </label>
            </div>
        </main>
    );
}