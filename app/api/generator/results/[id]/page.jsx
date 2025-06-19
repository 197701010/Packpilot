'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

export default function GeneratorResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);

  // Check if this is a batch request
  const batchIds = searchParams.get('batch');
  const totalImages = parseInt(searchParams.get('total')) || 1;
  const isBatch = !!batchIds && totalImages > 1;
  const imageIds = isBatch ? batchIds.split(',') : [id];

  console.log('🔍 Results page initialized:', {
    id,
    isBatch,
    imageIds,
    totalImages
  });

  // Extract image URL from result
  const getImageUrl = (result) => {
    if (!result) return null;
    
    const possibleUrls = [
      result.output?.sample,
      result.output?.image_url,
      result.output,
      result.result?.sample,
      result.result?.output,
      result.sample,
      result.image_url
    ];
    
    for (const url of possibleUrls) {
      if (url && typeof url === 'string' && url.includes('http')) {
        return url;
      }
    }
    
    return null;
  };

  // Check status for single image
  const checkSingleStatus = async (imageId) => {
    try {
      const response = await fetch(`/api/checkstatus/${imageId}`);
      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('❌ Status check error for', imageId, ':', error);
      return { 
        id: imageId,
        error: error.message,
        status: 'Error',
        completed: true 
      };
    }
  };

  // Check status for all images
  const checkAllStatuses = async () => {
    try {
      console.log('🔍 Checking status for images:', imageIds);
      
      const statusPromises = imageIds.map(imageId => checkSingleStatus(imageId));
      const allResults = await Promise.all(statusPromises);
      
      console.log('📊 All status results:', allResults);
      
      setResults(allResults);
      
      // Check if all images are completed
      const allCompleted = allResults.every(result => 
        result.completed === true || 
        result.status === 'Ready' || 
        result.status === 'Error' ||
        result.error
      );
      
      if (allCompleted) {
        console.log('✅ All images completed!');
        setIsLoading(false);
        
        // Stop polling
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
      }
      
    } catch (error) {
      console.error('❌ Batch status check error:', error);
      setError(error.message);
      setIsLoading(false);
      
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    }
  };

  // Start polling
  useEffect(() => {
    if (imageIds.length === 0) return;

    console.log('🚀 Starting status polling for:', imageIds);
    
    // Initial check
    checkAllStatuses();
    
    // Set up polling interval (every 3 seconds)
    const interval = setInterval(checkAllStatuses, 3000);
    setPollingInterval(interval);
    
    // Cleanup on unmount
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [imageIds.join(',')]);

  // Loading state
  if (isLoading) {
    const completedCount = results.filter(r => r.completed || r.status === 'Ready').length;
    const progressPercentage = Math.round((completedCount / totalImages) * 100);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Bezig...
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                ⏳ {isBatch ? 'Je ontwerpen worden' : 'Je ontwerp wordt'} gegenereerd...
              </h2>
              
              <p className="text-gray-600 mb-4">
                Dit kan 1-3 minuten duren. De pagina wordt automatisch bijgewerkt.
              </p>

              {isBatch && (
                <div className="mb-4">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {completedCount} van {totalImages} ontwerpen klaar ({progressPercentage}%)
                  </p>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  {isBatch ? `Batch ID: ${id}` : `ID: ${id}`}
                </p>
                <p className="text-sm text-gray-500">Service: bfl</p>
                {isBatch && (
                  <p className="text-sm text-gray-500">
                    Totaal: {totalImages} ontwerpen
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full">
                  ❌ Error
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Er is een fout opgetreden
              </h2>
              
              <p className="text-gray-600 mb-4">{error}</p>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Probeer opnieuw
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state - show results
  const successfulResults = results.filter(r => !r.error && getImageUrl(r));
  const failedResults = results.filter(r => r.error || !getImageUrl(r));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Vernieuwen
            </button>
            <button
              onClick={() => window.location.href = '/generator'}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Terug naar Generator
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {isBatch ? 'Je Ontwerpen' : 'Je Ontwerp'}
            </h1>
            
            <p className="text-gray-600 mb-6">
              {isBatch 
                ? `Resultaat van je batch packaging generatie (${successfulResults.length}/${totalImages} succesvol)`
                : 'Resultaat van je packaging generatie'
              }
            </p>

            {/* Status Summary */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Overzicht</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-green-800">
                    <span className="font-medium text-2xl">{successfulResults.length}</span>
                    <span className="text-sm ml-2">Succesvol</span>
                  </div>
                </div>
                
                {failedResults.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-800">
                      <span className="font-medium text-2xl">{failedResults.length}</span>
                      <span className="text-sm ml-2">Gefaald</span>
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-blue-800">
                    <span className="font-medium text-2xl">{totalImages}</span>
                    <span className="text-sm ml-2">Totaal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {successfulResults.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  🎊 {successfulResults.length === 1 
                    ? 'Je ontwerp is succesvol gegenereerd!' 
                    : `${successfulResults.length} ontwerpen zijn succesvol gegenereerd!`
                  } (Gemaakt met Black Forest Labs Flux AI)
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Klik met de rechtermuisknop op een afbeelding om op te slaan, of gebruik de download buttons.
                </p>
              </div>
            )}

            {/* Images Grid */}
            {successfulResults.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🎉 {successfulResults.length === 1 ? 'Je AI-gegenereerde ontwerp:' : 'Je AI-gegenereerde ontwerpen:'}
                </h3>
                
                <div className={`grid gap-6 ${
                  successfulResults.length === 1 
                    ? 'grid-cols-1 max-w-2xl mx-auto' 
                    : successfulResults.length === 2 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {successfulResults.map((result, index) => {
                    const imageUrl = getImageUrl(result);
                    const proxyUrl = imageUrl ? `/api/image-proxy?url=${encodeURIComponent(imageUrl)}` : null;
                    
                    return (
                      <div key={result.id || index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                        {proxyUrl ? (
                          <div className="aspect-square">
                            <img
                              src={proxyUrl}
                              alt={`AI-gegenereerd packaging ontwerp ${index + 1}`}
                              className="w-full h-full object-cover"
                              onLoad={() => console.log(`✅ Image ${index + 1} loaded successfully`)}
                              onError={(e) => {
                                console.error(`❌ Image ${index + 1} failed to load`);
                                e.target.parentElement.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center bg-gray-200">
                                    <p class="text-gray-500">⚠️ Kon afbeelding niet laden</p>
                                  </div>
                                `;
                              }}
                            />
                          </div>
                        ) : (
                          <div className="aspect-square flex items-center justify-center bg-gray-200">
                            <p className="text-gray-500">⚠️ Geen afbeelding beschikbaar</p>
                          </div>
                        )}
                        
                        {/* Image Actions */}
                        <div className="p-4">
                          <div className="flex gap-2 mb-2">
                            {proxyUrl && (
                              <a
                                href={proxyUrl}
                                download={`packaging-design-${index + 1}-${(result.id || 'unknown').substring(0, 8)}.jpg`}
                                className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm text-center hover:bg-green-700"
                              >
                                📥 Download
                              </a>
                            )}
                            {imageUrl && (
                              <a
                                href={imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm text-center hover:bg-blue-700"
                              >
                                🔗 Origineel
                              </a>
                            )}
                          </div>
                          
                          <p className="text-xs text-gray-500">
                            Ontwerp {index + 1}
                            {result.id && ` • ID: ${result.id.substring(0, 8)}...`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Failed Results */}
            {failedResults.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ⚠️ Gefaalde Ontwerpen ({failedResults.length})
                </h3>
                
                <div className="space-y-2">
                  {failedResults.map((result, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-800 text-sm">
                        Ontwerp {result.index || index + 1}: {result.error || 'Onbekende fout'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Details */}
            <details className="mt-6">
              <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                ▶ Technische details tonen
              </summary>
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <pre className="text-xs text-gray-600 overflow-auto max-h-64">
                  {JSON.stringify({
                    batch: isBatch,
                    total_images: totalImages,
                    successful: successfulResults.length,
                    failed: failedResults.length,
                    results: results
                  }, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}