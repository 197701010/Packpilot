'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function EditorPage() {
  const params = useParams();
  const { id } = params;
  
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Load image data for editing
      loadImageForEditing();
    }
  }, [id]);

  const loadImageForEditing = async () => {
    try {
      setLoading(true);
      // This would typically fetch the image data from your API
      // For now, we'll just simulate loading
      setTimeout(() => {
        setImage({ id, url: `/api/image-proxy?id=${id}` });
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Afbeelding laden...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Fout bij laden</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={loadImageForEditing}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Probeer opnieuw
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!image) { 
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Afbeelding laden...</p>
          </div>
        </div>
      </div>
    ); 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Afbeelding Editor</h1>
        <p className="text-gray-600 mb-8">Bewerk je AI-gegenereerde packaging ontwerp</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Ontwerp Preview</h3>
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={image.url}
                  alt="AI-gegenereerd packaging ontwerp"
                  className="w-full max-w-2xl mx-auto block"
                  style={{ maxHeight: '600px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>

          {/* Editor Tools */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Editor Tools</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Helderheid
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    defaultValue="100"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contrast
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    defaultValue="100"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verzadiging
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    defaultValue="100"
                    className="w-full"
                  />
                </div>

                <hr className="my-4" />

                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Wijzigingen Toepassen
                  </button>
                  
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                    Download Bewerkte Versie
                  </button>
                  
                  <button 
                    onClick={() => window.history.back()}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    Terug naar Resultaten
                  </button>
                </div>
              </div>
            </div>

            {/* Image Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Afbeelding Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">ID:</span> {id}</p>
                <p><span className="font-medium">Status:</span> Klaar voor bewerking</p>
                <p><span className="font-medium">Type:</span> AI-gegenereerd ontwerp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}