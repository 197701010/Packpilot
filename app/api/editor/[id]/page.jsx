// =================================================================
//    VOLLEDIGE CODE VOOR app/(main)/(tools)/editor/[id]/page.jsx
// =================================================================
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { ArrowLeft, Download, XOctagon, Wand2, Image as ImageIcon, ZoomOut, Star, Type, Droplet, Filter, Scissors } from 'lucide-react';

// Data (onveranderd)
const editTools = [
    { id: 'magic-erase', name: 'Magic Erase', icon: Wand2 },
    { id: 'background', name: 'Background', icon: ImageIcon },
    { id: 'zoom-out', name: 'Zoom Out', icon: ZoomOut },
    { id: 'logo', name: 'Logo', icon: Star },
    { id: 'upscale', name: 'Upscale', icon: Scissors },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'adjust', name: 'Adjust', icon: Filter, status: 'PLUS' },
    { id: 'colour', name: 'Colour', icon: Droplet, status: 'COMING SOON' },
];
const generatedImages = [
    { id: '1', title: 'Aerosol can for michael', imageUrl: '/preview-1.jpg' },
    { id: '2', title: 'Advent calendar for cvbox', imageUrl: '/preview-2.jpg' },
    { id: '3', title: 'New product launch', imageUrl: '/preview-3.jpg' },
];


export default function EditorDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [activeTool, setActiveTool] = useState(null);
    const [image, setImage] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (params.id) {
            const selectedImage = generatedImages.find(img => img.id.toString() === params.id);
            if (selectedImage) setImage(selectedImage);
        }
    }, [params.id]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // --- FORENSISCHE DEBUG LOG ---
    // Dit effect draait elke keer als 'activeTool' verandert.
    // VERVANG DE VORIGE DEBUG-HOOK MET DEZE:

// --- ONVOORWAARDELIJKE DEBUG LOG ---
useEffect(() => {
    // We halen de 'if' check weg om ALTIJD te loggen.
    console.log("--- DEBUG LOG ---");
    console.log("De waarde van activeTool is nu:", activeTool);
    console.log("Het type van activeTool is nu:", typeof activeTool);
    console.log("--- EINDE DEBUG ---");
}, [activeTool]);

            // Log de character codes van de string
            let charCodes = [];
            for (let i = 0; i < activeTool.length; i++) {
                charCodes.push(activeTool.charCodeAt(i));
            }
            console.log("Character Codes:", charCodes.join(', '));
            console.log("--- EINDE DEBUG ---");
        }
    }, [activeTool]);


    if (!image) { return <div className="flex items-center justify-center h-full">Afbeelding laden...</div>; }

    return (
        <div className="flex flex-col h-full bg-subtle"> 
            <header className="flex items-center justify-between p-3 border-b bg-white flex-shrink-0">
                <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="w-5 h-5 mr-2" />Editor</Button>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Download className="w-5 h-5 mr-2" />Download</Button>
                    <Button variant="destructive"><XOctagon className="w-5 h-5 mr-2" />Discard</Button>
                    <Button>Generate</Button>
                </div>
            </header>
            
            <div className="flex-1 grid grid-cols-12 gap-4 p-4">
                <aside className="col-span-3">
                    <div className="bg-white p-4 rounded-xl border h-full">
                        <h2 className="text-xl font-bold mb-1">Edit tools</h2>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {editTools.map(tool => (
                                <div key={tool.id} onClick={() => setActiveTool(tool.id)} className={`p-3 border-2 rounded-xl text-center cursor-pointer transition-all ${activeTool === tool.id ? 'border-brand-primary bg-red-50' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                                    <tool.icon className="mx-auto w-7 h-7 text-dark" strokeWidth={1.5} />
                                    <p className="font-semibold mt-2 text-sm">{tool.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <section className="col-span-6 flex items-center justify-center bg-white rounded-xl p-4 border">
                    <img src={image.imageUrl} alt={image.title} className="max-w-full max-h-full object-contain rounded-lg"/>
                </section>

                <aside className="col-span-3">
                    <div className="bg-white p-6 rounded-xl border h-full flex flex-col">
                        {isMounted && !activeTool && (
                            <div className="text-center text-gray-500 m-auto">Selecteer een tool om te beginnen.</div>
                        )}
                        {isMounted && activeTool === 'zoom-out' && (
                            <div className="space-y-4"><h3 className="font-bold text-lg">Zoom Out Paneel</h3><p>Werkt!</p></div>
                        )}
                        {isMounted && activeTool === 'logo' && (
                           <div className="space-y-4"><h3 className="font-bold text-lg">Logo Paneel</h3><p>Werkt!</p></div>
                        )}
                        {/* We testen nu alleen deze twee voor de eenvoud */}
                    </div>
                </aside>
            </div>
        </div>
    );
}