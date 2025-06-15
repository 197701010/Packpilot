"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = 'force-dynamic';

const variationsData = [
  { id: 'luxury', name: 'Luxury', description: 'Luxurious, sophisticated and high-quality aesthetics.', credits: 0, imageSrc: '/images/variations/luxury.png' },
  { id: 'creative', name: 'Creative', description: 'Experimental, avant-garde, and artistic interpretations.', credits: 0, imageSrc: '/images/variations/creative.png' },
];

export default function FinalStepPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [numImages, setNumImages] = useState(9);
  const [selectedVariations, setSelectedVariations] = useState({});
  const totalCredits = 10;
  const [promptData, setPromptData] = useState({});

  useEffect(() => {
    const data = {
      company: searchParams.get("company") || "",
      slogan: searchParams.get("slogan") || "",
      colors: searchParams.get("colors") ? searchParams.get("colors").split(',') : [],
      description: searchParams.get("description") || "",
      styles: searchParams.get("styles") ? searchParams.get("styles").split(',') : [],
    };
    setPromptData(data);
  }, [searchParams]);

  const usedCredits = useMemo(() => {
    let credits = numImages;
    Object.keys(selectedVariations).forEach(key => {
      if (selectedVariations[key]) {
        const variation = variationsData.find(v => v.id === key);
        if (variation) {
          credits += variation.credits;
        }
      }
    });
    return credits;
  }, [numImages, selectedVariations]);

  const handleVariationToggle = (id) => {
    setSelectedVariations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerate = () => {
    const finalConfiguration = {
      ...promptData,
      numImages,
      variations: Object.keys(selectedVariations).filter(key => selectedVariations[key]),
      totalCreditsCost: usedCredits,
    };
    console.log("--- STARTING GENERATION WITH THE FOLLOWING CONFIGURATION ---");
    console.log(finalConfiguration);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <header className="text-center mb-10">
          <p className="text-sm font-bold text-purple-600 tracking-wider">CONFIGURATION</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Final step</h1>
          <p className="text-gray-500 mt-4">Choose the number of images and concept types to generate.</p>
          <div className="flex justify-between items-center mt-6">
            <a href="#" className="text-sm text-blue-600 hover:underline">How-to guide</a>
            <div className="flex gap-2 items-center">
              <button onClick={() => router.back()} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Back</button>
              <div className="text-center">
                <button onClick={handleGenerate} className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">Generate</button>
                <div className="text-xs text-purple-600 font-bold mt-1">{usedCredits}/{totalCredits} Credits</div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800">Choose how many images to generate</h2>
            <p className="text-sm text-gray-500">1 credit per image</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {Array.from({ length: 9 }, (_, i) => i + 1).map(number => (
                <button 
                  key={number}
                  onClick={() => setNumImages(number)}
                  className={`py-6 text-2xl font-bold rounded-lg transition-all ${
                    numImages === number 
                    ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-800">Creative variations</h3>
            <p className="text-sm text-gray-600 mt-2">
              Adds additional designs that reinterpret your prompt - meaning more options to pick from.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Each creative variation will generate the same number of images as you select.
            </p>
            <div className="space-y-4 mt-6">
              {variationsData.map(variation => (
                <div key={variation.id} className="flex items-center gap-4">
                  <img src={variation.imageSrc} alt={variation.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{variation.name}</h4>
                    <p className="text-xs text-gray-500">{variation.description}</p>
                    <p className="text-xs font-bold text-purple-600">{variation.credits} credits</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={!!selectedVariations[variation.id]}
                      onChange={() => handleVariationToggle(variation.id)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* HET DEBUG-BLOK IS NU VERBORGEN */}
        {/*
          <div className="mt-12 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
              <h3 className="font-bold mb-2">Debugging Info: Ontvangen data voor de prompt</h3>
              <pre><code>{JSON.stringify(promptData, null, 2)}</code></pre>
          </div>
        */}

      </div>
    </div>
  );
}