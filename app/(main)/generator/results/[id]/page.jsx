'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

export default function GeneratorResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Get ID from URL params with fallbacks
  const id = params.id || params.slug;
  const batchParam = searchParams.get('batch');
  const totalParam = searchParams.get('total');
  
  // State management
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBatch, setIsBatch] = useState(false);
  const [batchIds, setBatchIds] = useState([]);
  
  console.log('🔍 Page Debug:', {
    id: id,
    batch: batchParam,
    total: totalParam,
    params: params,
    searchParams: Object.fromEntries(searchParams.entries())
  });

  // Initialize batch or single mode
  useEffect(() => {
    if (!id) {
      setError('Geen geldig ID gevonden in URL');
      setLoading(false);
      return;
    }

    if (batchParam) {
      // Batch mode
      const ids = batchParam.split(',').filter(Boolean);
      console.log('📊 Batch mode detected:', ids);
      setIsBatch(true);
      setBatchIds(ids);
      
      // Initialize results for all IDs
      const initialResults = {};
      ids.forEach(batchId => {
        initialResults[batchId] = {
          id: batchId,
          status: 'Pending',
          output: null,
          service: 'bfl',
          completed: false
        };
      });
      setResults(initialResults);
    } else {
      // Single mode
      console.log('🎯 Single mode detected:', id);
      setIsBatch(false);
      setBatchIds([id]);
      setResults({
        [id]: {
          id: id,
          status: 'Pending',
          output: null,
          service: 'bfl',
          completed: false
        }
      });
    }
    
    setLoading(false);
  }, [id, batchParam]);

  // Status checking function
  const checkStatus = async (imageId) => {
    try {
      console.log(`🔍 Checking status for: ${imageId}`);
      
      const response = await fetch(`/api/checkstatus/${imageId}`);
      const data = await response.json();
      
      console.log(`📊 Status response for ${imageId}:`, data);
      
      if (data.status === 'Ready' && data.completed === true) {
        console.log(`✅ Image ${imageId} is ready!`);
        return data;
      } else if (data.status === 'Error' || data.error) {
        console.log(`❌ Image ${imageId} failed:`, data.error);
        return { ...data, status: 'Error' };
      } else {
        console.log(`⏳ Image ${imageId} still processing...`);
        return data;
      }
    } catch (error) {
      console.error(`❌ Status check failed for ${imageId}:`, error);
      return {
        id: imageId,
        status: 'Error',
        error: `Status check failed: ${error.message}`,
        completed: false
      };
    }
  };

  // Polling function
  useEffect(() => {
    if (batchIds.length === 0) return;

    const pollStatuses = async () => {
      const updatedResults = { ...results };
      let allCompleted = true;
      let hasChanges = false;

      for (const imageId of batchIds) {
        const currentResult = updatedResults[imageId];
        
        // Skip if already completed or errored
        if (currentResult?.completed || currentResult?.status === 'Error') {
          continue;
        }

        allCompleted = false;
        const newData = await checkStatus(imageId);
        
        if (JSON.stringify(newData) !== JSON.stringify(currentResult)) {
          updatedResults[imageId] = newData;
          hasChanges = true;
        }
      }

      if (hasChanges) {
        setResults(updatedResults);
      }

      // Check if all are completed
      allCompleted = batchIds.every(imageId => 
        updatedResults[imageId]?.completed || 
        updatedResults[imageId]?.status === 'Error'
      );

      if (!allCompleted) {
        // Continue polling every 1 second for faster updates
        setTimeout(pollStatuses, 1000);
      } else {
        console.log('🎉 All images completed!');
      }
    };

    // Start polling
    const timer = setTimeout(pollStatuses, 1000);
    
    return () => clearTimeout(timer);
  }, [batchIds, results]);

  // Early return for errors
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Resultaten</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Fout: {error}</p>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>URL ID: {id || 'null'}</p>
            <p>Batch Param: {batchParam || 'null'}</p>
            <p>Params: {JSON.stringify(params)}</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Resultaten</h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-600">⏳ Pagina wordt geladen...</p>
        </div>
      </div>
    );
  }

  // Calculate completion stats
  const completedCount = batchIds.filter(imageId => 
    results[imageId]?.completed || results[imageId]?.status === 'Ready'
  ).length;
  const errorCount = batchIds.filter(imageId => 
    results[imageId]?.status === 'Error'
  ).length;
  const pendingCount = batchIds.length - completedCount - errorCount;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resultaten</h1>
        
        {isBatch && (
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">📊 Batch Voortgang</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                  <div className="text-gray-600">Voltooid</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
                  <div className="text-gray-600">Bezig</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                  <div className="text-gray-600">Gefaald</div>
                </div>
              </div>
              
              {pendingCount > 0 && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedCount / batchIds.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {completedCount} van {batchIds.length} ontwerpen klaar
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className={`grid gap-6 ${isBatch ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {batchIds.map((imageId, index) => {
            const result = results[imageId];
            if (!result) return null;

            return (
              <div key={imageId} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">
                      {isBatch ? `Ontwerp ${index + 1}` : 'Je Ontwerp'}
                    </h3>
                    
                    {/* Status Badge */}
                    {result.status === 'Ready' || result.completed ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        ✅ Voltooid
                      </span>
                    ) : result.status === 'Error' ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                        ❌ Gefaald
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        ⏳ Bezig
                      </span>
                    )}
                  </div>

                  {/* Image Display */}
                  {result.status === 'Ready' && result.output?.sample ? (
                    <div className="mb-4">
                      <img
                        src={`/api/image-proxy?url=${encodeURIComponent(result.output.sample)}`}
                        alt={`AI-gegenereerd packaging ontwerp ${index + 1}`}
                        className="w-full max-h-96 object-contain rounded-lg border bg-white"
                        onError={(e) => {
                          console.error(`❌ Image failed to load for ${imageId}`);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div 
                        className="w-full h-64 bg-gray-100 rounded-lg border flex items-center justify-center text-gray-500"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center">
                          <p className="mb-2">❌ Image failed to load via proxy</p>
                          <a 
                            href={result.output.sample}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Open originele link
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : result.status === 'Error' ? (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">
                        {result.error || 'Er is een fout opgetreden tijdens het genereren'}
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4 p-8 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-600 text-sm">⏳ Je ontwerp wordt gegenereerd...</p>
                        <p className="text-gray-500 text-xs mt-1">Dit kan 1-3 minuten duren</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {result.status === 'Ready' && result.output?.sample && (
                    <div className="flex gap-2">
                      <a
                        href={`/api/image-proxy?url=${encodeURIComponent(result.output.sample)}`}
                        download={`packaging-ontwerp-${index + 1}.jpg`}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center text-sm"
                      >
                        📥 Download Afbeelding
                      </a>
                      <a
                        href={result.output.sample}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-center text-sm"
                      >
                        🔗 Originele Link
                      </a>
                    </div>
                  )}

                  {/* Technical Details */}
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                      ▶ Technische details tonen
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          <a
            href="/generator"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Terug naar Generator
          </a>
        </div>
      </div>
    </div>
  );
}