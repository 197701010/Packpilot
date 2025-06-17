'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { ArrowLeft, Download, XOctagon, Wand2, Image as ImageIcon, ZoomOut, Star, Type, Droplet, Filter, Scissors, AlignLeft, AlignCenter, AlignRight, UploadCloud } from 'lucide-react';

// Data voor de bewerkingstools
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

// Data voor de afbeeldingen (om de juiste te kunnen selecteren)
const generatedImages = [
    { id: '1', title: 'Aerosol can for michael', imageUrl: '/preview-1.jpg' },
    { id: '2', title: 'Advent calendar for cvbox', imageUrl: '/preview-2.jpg' },
    { id: '3', title: 'New product launch', imageUrl: '/preview-3.jpg' },
];

export default function EditorDetailPage() {
    const router = useRouter();
    const params = useParams();

    const [activeTool, setActiveTool] = useState(null); // Begin zonder actieve tool
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (params.id) {
            const selectedImage = generatedImages.find(img => img.id === params.id);
            if (selectedImage) {
                setImage(selectedImage);
            }
        }
    }, [params.id]);

    if (!image) {
        return <div className="flex items-center justify-center h-full">Afbeelding laden...</div>;
    }

    return (
        <div className="flex flex-col h-full bg-subtle"> 
            <header className="flex items-center justify-between p-3 border-b bg-white flex-shrink-0">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Editor
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Download className="w-5 h-5 mr-2" />Download</Button>
                    <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700">
                        <XOctagon className="w-5 h-5 mr-2" />Discard
                    </Button>
                    {/* Paarse knop vervangen door ons merk-rood */}
                    <Button>Generate</Button>
                </div>
            </header>
            
            <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-y-auto">
                <div className="col-span-3">
                    <div className="bg-white p-4 rounded-xl border h-full">
                        <h2 className="text-xl font-bold mb-1">Edit tools</h2>
                        <p className="text-sm text-gray-500 mb-4">10 / 54 credits</p>
                        <div className="grid grid-cols-2 gap-3">
                            {editTools.map(tool => (
                                <div key={tool.id} onClick={() => setActiveTool(tool.id)} className={`p-3 border-2 rounded-xl text-center cursor-pointer transition-all ${activeTool === tool.id ? 'border-brand-primary bg-red-50' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                                    <tool.icon className="mx-auto w-7 h-7 text-dark" strokeWidth={1.5} />
                                    <p className="font-semibold mt-2 text-sm">{tool.name}</p>
                                    {tool.status && <span className={`text-xs font-bold ${tool.status === 'PLUS' ? 'text-purple-500' : 'text-blue-500'}`}>{tool.status}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-span-6 flex items-center justify-center bg-white rounded-xl p-4 border">
                    <img src={image.imageUrl} alt={image.title} className="max-w-full max-h-full object-contain rounded-lg"/>
                </div>

                <div className="col-span-3">
                    <div className="bg-white p-6 rounded-xl border h-full">
                        {/* HIER WORDT HET JUISTE PANEEL GETOOND */}
                        <ActiveToolPanel toolId={activeTool} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Hulp-component om het juiste paneel te renderen (NU VOLLEDIG INGEVULD)
const ActiveToolPanel = ({ toolId }) => {
    switch(toolId) {
        case 'magic-erase': return <MagicErasePanel />;
        case 'background': return <BackgroundPanel />;
        case 'zoom-out': return <ZoomOutPanel />;
        case 'logo': return <LogoPanel />;
        case 'upscale': return <UpscalePanel />;
        case 'text': return <TextPanel />;
        default: return <div className="p-4 h-full flex items-center justify-center text-center text-gray-500">Selecteer een tool om de opties te zien.</div>;
    }
};


// --- HIERONDER STAAN ALLE TOOL PANELS, NAGEMAAKT VAN JE SCREENSHOTS ---

function MagicErasePanel() {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-dark">Magic Erase</h3>
            <p className="text-sm text-gray-600">Paint over an area of the image to remove unwanted objects or people.</p>
            <div>
                <label className="text-sm font-medium">Brush Size</label>
                <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            {/* Kleur van knop aangepast */}
            <Button className="w-full">Apply Erase</Button>
        </div>
    );
}

function BackgroundPanel() {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-dark">Generate new background</h3>
            <p className="text-sm text-gray-600">Describe the new background you want to generate for your image.</p>
            <Textarea placeholder="e.g., 'A beautiful beach with a clear blue sky'" rows={4} />
            <Button className="w-full">Generate</Button>
        </div>
    );
}

function ZoomOutPanel() {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-dark">Zoom Out</h3>
            <p className="text-sm text-gray-600">Expand the canvas of your image to get a broader view. Our AI will fill in the new space.</p>
            <Button className="w-full">Generate More</Button>
        </div>
    );
}

function LogoPanel() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-dark">Upload logo</h3>
                <div>
                    <button className="text-sm font-semibold text-brand-primary">Select</button>
                    <button className="text-sm font-semibold text-gray-500 ml-4">Deselect</button>
                </div>
            </div>
            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <UploadCloud className="mx-auto w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-600 mt-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">max. 55MB</p>
            </div>
        </div>
    )
}

function UpscalePanel() {
    const [scale, setScale] = useState('2x');
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-dark">Upscale your image</h3>
            <p className="text-sm text-gray-600">Enhance its resolution and clarity.</p>
            <div>
                <label className="text-sm font-medium">Select Scale</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <button onClick={() => setScale('2x')} className={`p-3 rounded-lg font-semibold border-2 ${scale === '2x' ? 'border-brand-primary bg-red-50' : 'bg-gray-100 border-transparent'}`}>2x</button>
                    <button onClick={() => setScale('4x')} className={`p-3 rounded-lg font-semibold border-2 ${scale === '4x' ? 'border-brand-primary bg-red-50' : 'bg-gray-100 border-transparent'}`}>4x</button>
                </div>
            </div>
        </div>
    )
}

function TextPanel() {
    const [align, setAlign] = useState('left');
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-dark">New text</h3>
            <Input type="text" placeholder="Enter updated text..." />
            <div>
                <label className="text-sm font-medium">Text alignment (optional)</label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                    <button onClick={() => setAlign('default')} className={`p-2 rounded-lg ${align === 'default' ? 'bg-gray-200' : 'bg-gray-100'}`}><AlignLeft/></button>
                    <button onClick={() => setAlign('left')} className={`p-2 rounded-lg ${align === 'left' ? 'bg-gray-200' : 'bg-gray-100'}`}><AlignLeft/></button>
                    <button onClick={() => setAlign('center')} className={`p-2 rounded-lg ${align === 'center' ? 'bg-gray-200' : 'bg-gray-100'}`}><AlignCenter/></button>
                    <button onClick={() => setAlign('right')} className={`p-2 rounded-lg ${align === 'right' ? 'bg-gray-200' : 'bg-gray-100'}`}><AlignRight/></button>
                </div>
            </div>
        </div>
    )
}