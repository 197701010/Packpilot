'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function GeneratorResultsPage() {
  const params = useParams();
  const { id } = params;
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || id === 'undefined') {
      setError('Geen geldig ID gevonden');
      setLoading(false);
      return;
    }

    checkStatus();
  }, [id]);

  const checkStatus = async () => {
    try {
      console.log('Checking status for ID:', id);
      
      const response = await fetch(`/api/status/${id}`);
      
      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Status result:', data);
      
      setResult(data);
      setLoading(false);
      
    } catch (error) {
      console.error('Status check error:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const refreshStatus = () => {
    setLoading(true);
    setError(null);
    checkStatus();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Laden van je ontwerp...</h1>
          <p className="text-gray-600">Een moment geduld</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Fout</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button 
              onClick={refreshStatus}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Probeer opnieuw
            </button>
            <button 
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Terug
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Je Ontwerp</h1>
        <p className="text-gray-600">Resultaat van je packaging generatie</p>
      </div>

      <div className="mb-6 flex gap-4">
        <button 
          onClick={refreshStatus}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Vernieuwen
        </button>
        <button 
          onClick={() => window.history.back()}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Terug naar Generator
        </button>
      </div>

      {result && (
        <div className="border rounded-lg p-6 bg-white">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Ontwerp Details</h3>
            <StatusBadge status={result.status} />
          </div>
          
          <div className="mb-4 space-y-2">
            <p className="text-sm text-gray-600">ID: {result.id}</p>
            <p className="text-sm text-gray-600">Service: {result.service}</p>
            {result.created_at && (
              <p className="text-sm text-gray-600">
                Gestart: {new Date(result.created_at).toLocaleString('nl-NL')}
              </p>
            )}
            {result.completed_at && (
              <p className="text-sm text-gray-600">
                Voltooid: {new Date(result.completed_at).toLocaleString('nl-NL')}
              </p>
            )}
          </div>

          {result.error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Fout:</strong> {result.error}
            </div>
          )}

          {result.output && (
            <div className="mt-4">
              <h4 className="font-semibold mb-4">Resultaat:</h4>
              {Array.isArray(result.output) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.output.map((imageUrl, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <img 
                        src={imageUrl} 
                        alt={`Generated design ${imgIndex + 1}`}
                        className="w-full rounded-lg border shadow-lg"
                      />
                      <a 
                        href={imageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70"
                      >
                        Openen
                      </a>
                    </div>
                  ))}
                </div>
              ) : typeof result.output === 'string' && result.output.startsWith('http') ? (
                <div className="relative inline-block">
                  <img 
                    src={result.output} 
                    alt="Generated design"
                    className="w-full max-w-md rounded-lg border shadow-lg"
                  />
                  <a 
                    href={result.output} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70"
                  >
                    Openen
                  </a>
                </div>
              ) : (
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(result.output, null, 2)}
                </pre>
              )}
            </div>
          )}

          {!result.completed && !result.error && (
            <div className="mt-4">
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <p>⏳ Nog bezig met genereren... Dit kan een paar minuten duren.</p>
                <button 
                  onClick={refreshStatus}
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Status vernieuwen
                </button>
              </div>
            </div>
          )}

          {result.logs && result.logs.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer font-medium text-gray-700">Logs tonen</summary>
              <pre className="mt-2 bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
                {result.logs.join('\n')}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'starting':
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'succeeded':
        return 'Voltooid';
      case 'failed':
        return 'Mislukt';
      case 'starting':
        return 'Starten...';
      case 'processing':
        return 'Bezig...';
      default:
        return status || 'Onbekend';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
}