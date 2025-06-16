'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button'; // Importeer de nieuwe knop

export default function ExtractorPage() {
  const [fileFormat, setFileFormat] = useState('svg');
  const [activeTab, setActiveTab] = useState('basic');

  const fileFormats = ['svg', 'pdf', 'dxf', 'eps'];

  return (
    <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-dark">Extractor</h1>
        <Button>Extract Artwork</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kaart 1: File formats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">File formats</h2>
          <p className="text-gray-500 text-sm mb-6">
            All extractions include PNG vector as well as your selected vector format below. We recommend SVG for most use cases.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {fileFormats.map((format) => {
              const isSelected = fileFormat === format;
              return (
                <button
                  key={format}
                  onClick={() => setFileFormat(format)}
                  className={`p-4 rounded-lg border text-center font-medium transition-colors duration-200 ${
                    isSelected
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-white text-dark hover:bg-subtle border-gray-300'
                  }`}
                >
                  {format.toUpperCase()} extract
                </button>
              );
            })}
          </div>
        </div>

        {/* Kaart 2: Afbeelding */}
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-center">
            <img src="https://i.imgur.com/G4G4qMh.png" alt="Packaging mockup of a food container" className="max-h-full w-auto object-contain" />
        </div>

        {/* Kaart 3: Vectorise controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg">Vectorise controls</h2>
          <div className="flex border-b mt-4">
            <button
              onClick={() => setActiveTab('basic')}
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === 'basic'
                  ? 'border-b-2 border-brand-primary text-brand-primary'
                  : 'text-gray-500 hover:text-dark'
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`py-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === 'advanced'
                  ? 'border-b-2 border-brand-primary text-brand-primary'
                  : 'text-gray-500 hover:text-dark'
              }`}
            >
              Advanced
            </button>
          </div>
          <div className="mt-4">
            {activeTab === 'basic' ? (
              <div>
                <h3 className="font-semibold mb-2">BASIC</h3>
                <p className="text-gray-500 text-sm">
                  We have chosen the optimum and scalable settings for this extraction. If you want more control over the parameters, choose advanced above.
                </p>
              </div>
            ) : (
              <div>
                {/* Hier komen de 'Advanced' controls */}
                <p className="text-sm text-gray-500">Advanced controls will be available here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}