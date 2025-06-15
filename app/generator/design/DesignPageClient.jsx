"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiUpload, FiGrid } from "react-icons/fi";

const stylesData = [
    { name: 'Minimalistic', description: 'Characterized by simplicity and clarity, embracing elegance.', imageSrc: '/images/styles/minimalistic.png' },
    { name: 'Bold', description: 'A focus on bold typography, colors and patterns.', imageSrc: '/images/styles/bold.png' },
    { name: 'Modern', description: 'Clean lines, minimalism, effective use of gradients, and a neutral color palette.', imageSrc: '/images/styles/modern.png' },
    { name: 'Vintage', description: 'Particular attention to vintage, retro, and nostalgic typography, colors and patterns.', imageSrc: '/images/styles/vintage.png' },
    { name: 'Luxurious', description: 'A focus on luxury, elegance, and sophistication.', imageSrc: '/images/styles/luxurious.png' },
    { name: 'Geometric', description: 'Characterized by geometric shapes, patterns, and a neutral color palette.', imageSrc: '/images/styles/geometric.png' },
    { name: 'Illustrative', description: 'Noted for illustrative elements, such as detailed drawings, lively colors, and textures.', imageSrc: '/images/styles/illustrative.png' },
    { name: 'Abstract', description: 'Known for its abstract shapes, patterns, and a neutral color palette.', imageSrc: '/images/styles/abstract.png' },
    { name: 'Earthy', description: 'Earthy palettes, raw textures and restrained graphics that signal sustainability and natural origins.', imageSrc: '/images/styles/earthy.png' },
    { name: 'Active Colors', description: 'A focus on bold typography, colors and patterns.', imageSrc: '/images/styles/active-colors.png' },
    { name: 'Pop Art', description: 'Comic-inspired imagery and high-contrast primaries that explode with playful, cultural punch.', imageSrc: '/images/styles/pop-art.png' },
    { name: 'Retro Futurism', description: 'Nostalgic sci-fi motifs mixed with sleek finishes, bridging yesterday’s dreams and tomorrow’s tech.', imageSrc: '/images/styles/retro-futurism.png' },
    { name: 'Handcrafted', description: 'Visible brushstrokes, letterpress textures and imperfect lines that scream ‘artisanal made’.', imageSrc: '/images/styles/handcrafted.png' },
    { name: 'Neon Gamer', description: 'Pixel art, glitch effects and electric neons tapping straight into gaming culture.', imageSrc: '/images/styles/neon-gamer.png' },
    { name: 'Geo-Primary Pop', description: 'Simple block shapes in bold primary hues for a playful yet clean modern punch.', imageSrc: '/images/styles/geo-primary-pop.png' },
    { name: 'Mono Emblem', description: 'One oversized icon or letterform dominates, ensuring instant recognition at any size.', imageSrc: '/images/styles/mono-emblem.png' },
    { name: 'Pastel Dream', description: 'Ice-cream pastels and gentle gradients for a calming, sweet visual softness ideal for beauty or toddler SKUs.', imageSrc: '/images/styles/pastel-dream.png' },
];

export default function DesignPageClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [description, setDescription] = useState("");
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [activeTab, setActiveTab] = useState("Styles");

    const [promptData, setPromptData] = useState({ packaging: '', company: '', slogan: '', colors: [] });

    useEffect(() => {
        const data = {
            packaging: searchParams.get("packaging") || "",
            company: searchParams.get("company") || "",
            slogan: searchParams.get("slogan") || "",
            colors: searchParams.get("colors") ? searchParams.get("colors").split(',') : [],
        };
        setPromptData(data);
    }, [searchParams]);

    const handleStyleSelect = (styleName) => {
        if (selectedStyles.includes(styleName)) {
            setSelectedStyles(selectedStyles.filter((s) => s !== styleName));
        } else if (selectedStyles.length < 3) {
            setSelectedStyles([...selectedStyles, styleName]);
        }
    };

    const handleNext = () => {
        const params = new URLSearchParams({
            ...promptData,
            colors: promptData.colors.join(','),
            description,
            styles: selectedStyles.join(','),
        });
        router.push(`/generator/final?${params.toString()}`);
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto py-12 px-4">
                <header className="text-center mb-10">
                    <p className="text-sm font-bold text-purple-600 tracking-wider">YOUR DESIGN</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Describe your design</h1>
                    <p className="text-gray-500 mt-4">Describe your design, pick from one of our styles or upload a reference image.</p>
                    <div className="flex justify-between items-center mt-6">
                        <a href="#" className="text-sm text-blue-600 hover:underline">How-to guide</a>
                        <div className="flex gap-2">
                            <button onClick={() => router.back()} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Back</button>
                            <button onClick={handleNext} className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">Next</button>
                        </div>
                    </div>
                </header>
                {/* ... de rest van de JSX ... */}
                <div className="bg-white">
                    <label htmlFor="packaging-look" className="text-lg font-semibold text-gray-800">
                        How should your packaging look?
                        <span className="text-sm text-gray-400 font-normal ml-2">optional</span>
                    </label>
                    <div className="mt-2 relative">
                        <textarea id="packaging-look" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} placeholder="e.g. Create a sleek matte box with pastel pops, shiny foil touches, and bold clear text that delights every unboxing." className="w-full h-36 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        <div className="absolute bottom-3 right-3 flex items-center gap-4 text-sm">
                            <a href="#" className="text-purple-600 hover:underline font-semibold">Enhance prompt</a>
                            <span className="text-gray-400">{description.length}/500</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex gap-4 border-b">
                        <button onClick={() => setActiveTab('Upload')} className={`flex items-center gap-2 py-3 px-4 text-gray-600 font-semibold rounded-t-lg relative ${activeTab === 'Upload' ? 'text-purple-600' : ''}`}>
                            <FiUpload className="h-5 w-5" />
                            Upload
                            {activeTab === 'Upload' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600" />}
                        </button>
                        <button onClick={() => setActiveTab('Styles')} className={`flex items-center gap-2 py-3 px-4 text-gray-600 font-semibold rounded-t-lg relative ${activeTab === 'Styles' ? 'text-purple-600' : ''}`}>
                            <FiGrid className="h-5 w-5" />
                            Styles
                            {activeTab === 'Styles' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600" />}
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                    {activeTab === 'Upload' && (<div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg"><p>Hier komt de upload functionaliteit.</p></div>)}
                    {activeTab === 'Styles' && (
                        <div>
                            <p className="text-gray-600 mb-4">Choose up to 3 styles <span className="text-gray-400">optional</span></p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {stylesData.map(style => (
                                    <div key={style.name} onClick={() => handleStyleSelect(style.name)} className={`flex items-center gap-4 p-3 border rounded-xl cursor-pointer transition-all ${selectedStyles.includes(style.name) ? 'ring-2 ring-purple-600 bg-purple-50' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                        <img src={style.imageSrc} alt={style.name} className="w-20 h-20 rounded-lg object-cover" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800">{style.name}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}