'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function GeneratorResultsPage() {
  const params = useParams();
  const { id } = params;
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkStatus = async () => {
    try {
      console.log('🔥 CHECKING API ROUTE:', `/api/checkstatus/${id}`);
      const response = await fetch(`/api/checkstatus/${id}`);
      
      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 Status result:', data);
      
      setResult(data);
      setLoading(false);
      
    } catch (error) {
      console.error('❌ Error checking status:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      checkStatus();
    }
  }, [id]);

  // Extract image URL from various possible locations
  const getImageUrl = (result) => {
    if (!result) return null;
    
    console.log('🔍 Searching for image URL in result:', result);
    
    // Try different possible locations for the image URL
    const possibleUrls = [
      result.output?.sample,           // ← This is where it actually is!
      result.output,                   // In case output is direct string
      result.result?.sample,
      result.result?.output,
      result.sample,
      result.image_url,
      result.raw_result?.result?.sample // Also check raw_result
    ];
    
    for (const url of possibleUrls) {
      if (url && typeof url === 'string' && url.startsWith('http')) {
        console.log('🖼️ Found image URL:', url);
        return url;
      }
    }
    
    console.log('❌ No valid image URL found in result');
    console.log('🔍 Checked these locations:', possibleUrls);
    return null;
  };

  const imageUrl = getImageUrl(result);
  const proxyUrl = imageUrl ? `/api/image-proxy?url=${encodeURIComponent(imageUrl)}` : null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Je Ontwerp</h1>
          <p className="text-gray-600 mb-8">Resultaat van je packaging generatie</p>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
          <h1 className="text-3xl font-bold mb-4">Je Ontwerp</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Er is een fout opgetreden</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={checkStatus}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Probeer opnieuw
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = result?.completed || result?.status === 'Ready' || result?.status === 'succeeded';
  const statusColor = isCompleted ? 'green' : 'blue';
  const statusText = isCompleted ? 'Voltooid' : 'Bezig...';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Je Ontwerp</h1>
        <p className="text-gray-600 mb-8">Resultaat van je packaging generatie</p>
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={checkStatus}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Vernieuwen
          </button>
          <button 
            onClick={() => window.location.href = '/generator'}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Terug naar Generator
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Ontwerp Details</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColor === 'green' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {statusText}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">ID:</span> {result?.id}</p>
              <p><span className="font-medium">Service:</span> {result?.service}</p>
            </div>
          </div>

          {/* Image Display */}
          {isCompleted && imageUrl ? (
            <div className="mb-6">
              <h4 className="font-semibold mb-4 text-lg">🎉 Je AI-gegenereerde ontwerp:</h4>
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={proxyUrl}
                    alt="AI-gegenereerd packaging ontwerp"
                    className="w-full max-w-2xl mx-auto block"
                    style={{ maxHeight: '600px', objectFit: 'contain' }}
                    onLoad={() => console.log('✅ Image loaded successfully via proxy')}
                    onError={(e) => {
                      console.error('❌ Image failed to load via proxy');
                      console.log('🔗 Tried to load:', proxyUrl);
                    }}
                  />
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="text-green-800 font-semibold mb-2">
                    🎊 Je ontwerp is succesvol gegenereerd! (Gemaakt met Black Forest Labs Flux AI)
                  </h5>
                  <p className="text-green-700 text-sm mb-3">
                    Klik met de rechtermuisknop op de afbeelding om op te slaan, of gebruik de download knop als de afbeelding niet zichtbaar is.
                  </p>
                  <div className="flex gap-2">
                    <a 
                      href={proxyUrl}
                      download={`packaging-design-${id}.jpg`}
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      📥 Download Afbeelding
                    </a>
                    <a 
                      href={imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      🔗 Originele Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : isCompleted ? (
            <div className="mb-6">
              <h4 className="font-semibold mb-4">⚠️ Ontwerp voltooid maar geen afbeelding gevonden</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  Het ontwerp is klaar, maar de afbeelding kon niet worden geladen. 
                  Probeer de pagina te vernieuwen of neem contact op met support.
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <h4 className="font-semibold mb-4">⏳ Je ontwerp wordt gegenereerd...</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  Dit kan 1-3 minuten duren. De pagina wordt automatisch bijgewerkt.
                </p>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Debug/Technical Details */}
          <details className="mt-6">
            <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
              ▶ Technische details tonen
            </summary>
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <pre className="text-xs text-gray-600 overflow-auto max-h-64">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}