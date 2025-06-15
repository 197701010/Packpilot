import React from 'react';

export default function ZoomOutPanel() {
  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-2">Zoom Out</h3>
      <p className="text-sm text-gray-600 mb-4">
        Expand the canvas of your image to get a broader view. Our AI will fill in the new space.
      </p>

      <button className="w-full mt-4 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
        Generate More
      </button>
    </div>
  );
}