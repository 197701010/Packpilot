'use client';

import { useParams } from 'next/navigation';

export default function EditorPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Afbeelding Editor</h1>
        <p className="text-gray-600 mb-8">Editor voor ontwerp: {id}</p>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-500">
            Editor functionaliteit komt binnenkort beschikbaar.
          </p>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Terug naar Resultaten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}