import React from 'react';

export default function BackgroundPanel() {
  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-2">Generate new background</h3>
      <p className="text-sm text-gray-600 mb-4">
        Describe the new background you want to generate for your image.
      </p>
      
      <textarea
        placeholder="e.g., 'A beautiful beach with a clear blue sky'"
        className="w-full h-28 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button className="w-full mt-4 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
        Generate
      </button>
    </div>
  );
}