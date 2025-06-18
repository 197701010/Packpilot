'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { ArrowLeft, Download, XOctagon, Wand2, Image as ImageIcon, ZoomOut, Star, Type, Droplet, Filter, Scissors } from 'lucide-react';

// Data
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


// =================================================================
//                 PANEEL-COMPONENTEN PER TOOL
// Hier kun je straks de echte functionaliteit per tool in bouwen.
// =================================================================
function MagicErasePanel() {
    return (<div className="space-y-4"><h3 className="font-bold text-lg">Magic Erase</h3><Button className="w-full" onClick={() => alert('Magic Erase knop werkt!')}>Test Knop</Button></div>);
}
function BackgroundPanel() {
    return (<div className="space-y-4"><h3 className="font-bold text-lg">Background</h3><Button className="w-full" onClick={() => alert('Background knop werkt!')}>Test Knop</Button></div>);
}
function ZoomOutPanel() {
    return (<div className="space-y-4"><h3 className="font-bold text-lg">Zoom Out</h3><Button className="w-full" onClick={() => alert('Zoom Out knop werkt!')}>Test Knop</Button></div>);
}
function LogoPanel() {
    return (<div className="space-y-4"><h3 className="font-bold text-lg">Logo</h3><Button className="w-full" onClick={() => alert('Logo knop werkt!')}>Test Knop</Button></div>);
}
function UpscalePanel() {
    return (<div className="space-y-4"><h3 className="font-bold text-lg">Upscale</h3><Button className="w-full" onClick={() => alert('Upscale knop werkt!')}>Test Knop</Button></div>);
}
function TextPanel() {
    return (<div className="space-y-4"><h3 className="font-bold text-lg">Text</h3><Button className="w-full" onClick={() => alert('Text knop werkt!')}>Test Knop</Button></div>);
}
function AdjustPanel() {
    return (<div className="space-y-4"><h3 className="font-bold text-lg">Adjust</h3><Button className="w-full" onClick={() => alert('Adjust knop werkt!')}>Test Knop</Button></div>);
}


// =================================================================
//        DE ROBUUSTE ActiveToolPanel COMPONENT
//        Deze kiest het juiste paneel met simpele if-statements.
// =================================================================
function ActiveToolPanel({ toolId }) {
    if (!toolId) {
        return <div className="text-center text-gray-500 m-auto">Selecteer een tool om te beginnen.</div>;
    }

    if (toolId === 'magic-erase') return <MagicErasePanel />;
    if (toolId === 'background') return <BackgroundPanel />;
    if (toolId === 'zoom-out') return <ZoomOutPanel />;
    if (toolId === 'logo') return <LogoPanel />;
    if (toolId === 'upscale') return <UpscalePanel />;
    if (toolId === 'text') return <TextPanel />;
    if (toolId === 'adjust') return <AdjustPanel />;
    
    // Fallback voor tools die (nog) niet in de lijst staan (bv. 'Colour')
    return <div className="p-4 text-center text-gray-500">Tool <span className="font-semibold">{toolId}</span> is nog niet geïmplementeerd.</div>;
}


// =================================================================
//               DE HOOFDPAGINA COMPONENT
// =================================================================
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

    useEffect
    