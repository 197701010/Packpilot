"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
    FiArrowLeft, FiDownload, FiXOctagon, FiEdit2, FiMaximize, FiMinimize, 
    FiType, FiDroplet, FiStar, FiFilter, FiFeather
} from 'react-icons/fi';

// Importeer alle paneel-componenten
import UpscalePanel from '@/components/editor/UpscalePanel';
import LogoPanel from '@/components/editor/LogoPanel';
import TextPanel from '@/components/editor/TextPanel';
import BackgroundPanel from '@/components/editor/BackgroundPanel';
import MagicErasePanel from '@/components/editor/MagicErasePanel';
import ZoomOutPanel from '@/components/editor/ZoomOutPanel';

// Data voor de bewerkingstools
const editTools = [
    { id: 'magic-erase', name: 'Magic Erase', icon: <FiEdit2 size={24} /> },
    { id: 'background', name: 'Background', icon: <FiMaximize size={24} /> },
    { id: 'zoom-out', name: 'Zoom Out', icon: <FiMinimize size={24} /> },
    { id: 'logo', name: 'Logo', icon: <FiStar size={24} /> },
    { id: 'upscale', name: 'Upscale', icon: <FiFeather size={24} /> },
    { id: 'text', name: 'Text', icon: <FiType size={24} /> },
    { id: 'spot-uv', name: 'Spot UV', icon: <FiDroplet size={24} />, status: 'BETA' },
    { id: 'foiling', name: 'Foiling', icon: <FiStar size={24} />, status: 'BETA' },
    { id: 'adjust', name: 'Adjust', icon: <FiFilter size={24} />, status: 'PLUS' },
    { id: 'colour', name: 'Colour', icon: <FiDroplet size={24} />, status: 'COMING SOON' },
];

// Hulp-component om het juiste paneel te renderen
const ActiveToolPanel = ({ toolId }) => {
    switch(toolId) {
        case 'upscale':
            return <UpscalePanel />;
        case 'logo':
            return <LogoPanel />;
        case 'text':
            return <TextPanel />;
        case 'background':
            return <BackgroundPanel />;
        case 'magic-erase': // <-- TOEGEVOEGD
            return <MagicErasePanel />;
        case 'zoom-out': // <-- TOEGEVOEGD
            return <ZoomOutPanel />;
        default:
            return <div className="text-gray-500">Selecteer een tool om de opties te zien.</div>;
    }
};

export default function EditorPage() {
    const router = useRouter();
    const [activeTool, setActiveTool] = useState('background'); // Start met 'Background' als actieve tool
    const [mainImage, setMainImage] = useState('https://picsum.photos/seed/editorpage/800/600');

    return (
        <div className="flex flex-col h-full"> 
            <header className="flex items-center justify-between p-4 border-b bg-white flex-shrink-0">
                <button onClick={() => router.back()} className="flex items-center gap-2 font-semibold text-gray-700 hover:text-black">
                    <FiArrowLeft />
                    Editor
                </button>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 font-semibold text-gray-700 hover:text-black">
                        <FiDownload />
                        Download
                    </button>
                    <button className="flex items-center gap-2 font-semibold text-red-600 hover:text-red-800">
                        <FiXOctagon />
                        Discard edit
                    </button>
                    <button className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                        Generate
                    </button>
                </div>
            </header>
            
            <div className="flex-1 grid grid-cols-12 gap-6 p-6 bg-gray-50 overflow-y-auto">
                <div className="col-span-3">
                    <h2 className="text-xl font-bold mb-4">Edit tools</h2>
                    <p className="text-sm text-gray-500 mb-4">10 / 54 credits</p>
                    <div className="grid grid-cols-2 gap-3">
                        {editTools.map(tool => (
                            <div 
                                key={tool.id} 
                                onClick={() => setActiveTool(tool.id)}
                                className={`p-4 border rounded-xl text-center cursor-pointer transition-all ${activeTool === tool.id ? 'bg-purple-100 ring-2 ring-purple-600' : 'bg-white hover:bg-gray-100'}`}
                            >
                                <div className="flex justify-center text-gray-700">{tool.icon}</div>
                                <p className="font-semibold mt-2 text-sm">{tool.name}</p>
                                {tool.status && <span className={`text-xs font-bold ${tool.status === 'BETA' ? 'text-blue-500' : 'text-purple-500'}`}>{tool.status}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-5 flex items-center justify-center bg-white rounded-xl p-4">
                    <img src={mainImage} alt="Main edited image" className="max-w-full max-h-full object-contain rounded-lg"/>
                </div>

                <div className="col-span-4">
                    <div className="bg-white p-6 rounded-xl border h-full">
                        <ActiveToolPanel toolId={activeTool} />
                    </div>
                </div>
            </div>
        </div>
    );
}