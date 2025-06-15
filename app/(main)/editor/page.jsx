"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiZap, FiGrid, FiFile } from 'react-icons/fi';

// Hulpcomponent voor een kaartje in de "Edit" sectie
const EditCard = ({ icon, label, active, onClick }) => (
    <div 
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-6 border rounded-xl cursor-pointer transition-all ${active ? 'ring-2 ring-purple-600 bg-purple-50' : 'bg-white hover:bg-gray-50'}`}
    >
        {icon}
        <span className="mt-2 font-semibold text-gray-800">{label}</span>
    </div>
);

// Voorbeelddata voor de generaties
const generationsData = [
    { id: 'gen1', title: 'Aerosol can for michael', imageSrc: 'https://picsum.photos/seed/aerosol/500' },
    { id: 'gen2', title: 'Advent calendar for cvbox', imageSrc: 'https://picsum.photos/seed/advent/500' },
];

// Voorbeelddata voor recente edits
const recentEditsData = [
    { id: 'edit1', title: 'Image f43238fe', timestamp: 'Started today at 7:47 PM', status: 'In progress', imageSrc: 'https://picsum.photos/seed/recent1/500' }
];

export default function EditorStartPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [activeSubNav, setActiveSubNav] = useState('Generations'); // 'Generations', 'Collections', of 'Upload'

    const handleFileSelect = (file) => {
        if (!file) return;
        console.log("Bestand geselecteerd:", file.name);
        router.push('/editor/123');
    };
    
    // Navigeer naar de editor met de geselecteerde generatie
    const handleGenerationSelect = (generationId) => {
        console.log("Generatie geselecteerd:", generationId);
        router.push(`/editor/${generationId}`);
    }

    // Drag & Drop handlers
    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    return (
        <main className="w-full p-8">
            <h2 className="text-2xl font-bold">Edit</h2>
            <p className="text-gray-500 mt-1">Pick an image to get started</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                
                {/* Kolom 1: Subnavigatie */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                        <EditCard icon={<FiZap size={28} className="text-gray-600" />} label="Generations" active={activeSubNav === 'Generations'} onClick={() => setActiveSubNav('Generations')} />
                        <EditCard icon={<FiGrid size={28} className="text-gray-600" />} label="Collections" active={activeSubNav === 'Collections'} onClick={() => setActiveSubNav('Collections')} />
                        <EditCard icon={<FiFile size={28} className="text-gray-600" />} label="Upload" active={activeSubNav === 'Upload'} onClick={() => setActiveSubNav('Upload')} />
                    </div>
                </div>

                {/* Kolom 2: Hoofdcontent (conditioneel) */}
                <div className="lg:col-span-7">
                    {activeSubNav === 'Generations' && (
                        <div>
                            <h3 className="font-bold text-lg mb-2">Choose a generation</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {generationsData.map(gen => (
                                    <div key={gen.id} onClick={() => handleGenerationSelect(gen.id)} className="rounded-lg overflow-hidden cursor-pointer group relative">
                                        <img src={gen.imageSrc} alt={gen.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <p className="absolute bottom-2 left-3 text-white font-semibold">{gen.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeSubNav === 'Upload' && (
                         <label 
                            htmlFor="file-upload"
                            className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-purple-600 bg-purple-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <svg className="w-10 h-10 mb-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h.586a1 1 0 01.707.293l.414.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l.414-.414A1 1 0 0116.414 3H17a4 4 0 014 4v5a4 4 0 01-4 4h-2.586a1 1 0 00-.707.293l-.414.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-.414-.414A1 1 0 008.586 16H7z M7 16v4m10-4v4"></path></svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-purple-600">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">max. 55MB</p>
                            </div>
                            <input id="file-upload" type="file" className="hidden" onChange={(e) => handleFileSelect(e.target.files[0])} />
                        </label>
                    )}
                     {activeSubNav === 'Collections' && (
                        <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg bg-white">
                            <p className="text-gray-500">Collections komen hier.</p>
                        </div>
                    )}
                </div>
                
                {/* Kolom 3: Recent Edits */}
                <div className="lg:col-span-3">
                     <h3 className="font-bold text-lg mb-2">Recent Edits</h3>
                     <div className="flex gap-2 mb-4">
                        <button className="px-3 py-1 text-sm font-semibold bg-gray-800 text-white rounded-full">In Progress</button>
                        <button className="px-3 py-1 text-sm font-semibold bg-white border rounded-full">Completed</button>
                        <button className="px-3 py-1 text-sm font-semibold bg-white border rounded-full">All</button>
                     </div>
                     <div className="space-y-3">
                        {recentEditsData.map(edit => (
                            <div key={edit.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border cursor-pointer hover:bg-gray-50">
                                <img src={edit.imageSrc} alt={edit.title} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{edit.title}</p>
                                    <p className="text-xs text-gray-500">{edit.timestamp}</p>
                                    <span className="mt-1 inline-block px-2 py-0.5 text-xs font-bold text-orange-700 bg-orange-100 rounded-full">{edit.status}</span>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </main>
    );
}