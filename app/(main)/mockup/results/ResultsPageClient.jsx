"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Hulpcomponent voor een enkele placeholder met progressiebalk
const ImagePlaceholder = ({ progress }) => (
  <div className="bg-gray-200 rounded-lg aspect-square flex flex-col justify-end p-3 animate-pulse">
    <div className="w-full bg-gray-300 rounded-full h-1.5">
      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

// Hulpcomponent voor een "echte" afbeelding zodra deze geladen is
const GeneratedImage = ({ src }) => (
  <div className="bg-gray-100 rounded-lg aspect-square">
      <img src={src} alt="Generated image" className="w-full h-full object-cover rounded-lg" />
  </div>
);

export default function ResultsPageClient() {
  const searchParams = useSearchParams();
  
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  
  // Lees alle data uit de URL
  const promptData = {
    company: searchParams.get('company') || 'N/A',
    slogan: searchParams.get('slogan') || 'N/A',
    description: searchParams.get('description') || 'No description',
    colors: searchParams.get('colors')?.split(',') || [],
    styles: searchParams.get('styles')?.split(',') || ['N/A'],
    numImages: parseInt(searchParams.get('numImages') || '0', 10),
  };
  
  // Simuleer het generatieproces
  useEffect(() => {
    setProgress(0);
    setIsDone(false);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
        <header className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">Mockup for {promptData.company}</h1>
            <div className="flex items-center justify-between mt-2">
                <p className="text-gray-500">Created {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <div className="flex items-center gap-2">
                    {isDone ? (
                         <span className="px-3 py-1 text-sm font-bold text-green-700 bg-green-100 rounded-full">Complete</span>
                    ) : (
                         <span className="px-3 py-1 text-sm font-bold text-orange-700 bg-orange-100 rounded-full">Generating {progress}%</span>
                    )}
                    <button className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">Remix</button>
                </div>
            </div>
        </header>

        <div className="bg-gray-50 rounded-2xl p-6 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                  <h3 className="font-bold mb-2">Company</h3>
                  <p>{promptData.company}</p>
              </div>
              <div>
                  <h3 className="font-bold mb-2">Slogan</h3>
                  <p>{promptData.slogan}</p>
              </div>
              <div>
                  <h3 className="font-bold mb-2">Description</h3>
                  <p>{promptData.description}</p>
              </div>
              <div>
                  <h3 className="font-bold mb-2">Colours</h3>
                  <div className="flex gap-2">
                      {promptData.colors.map(color => (
                          <div key={color} style={{ backgroundColor: `#${color}` }} className="w-10 h-10 rounded-lg border border-gray-200" title={`#${color}`}></div>
                      ))}
                  </div>
              </div>
              <div>
                  <h3 className="font-bold mb-2">Style</h3>
                  <p>{promptData.styles.join(', ')}</p>
              </div>
          </div>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-4">Original</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: promptData.numImages }).map((_, index) => (
                    isDone 
                        ? <GeneratedImage key={index} src={`https://picsum.photos/500?random=${index}`} />
                        : <ImagePlaceholder key={index} progress={progress} />
                ))}
            </div>
        </div>
    </div>
  );
}