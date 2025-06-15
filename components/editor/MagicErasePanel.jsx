import React from 'react';

export default function MagicErasePanel() {
  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-2">Magic Erase</h3>
      <p className="text-sm text-gray-600 mb-4">
        Paint over an area of the image to remove unwanted objects or people.
      </p>

      <div>
        <label htmlFor="brush-size" className="font-semibold text-sm">Brush Size</label>
        <input id="brush-size" type="range" className="w-full mt-2" />
      </div>

      <button className="w-full mt-6 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
        Apply Erase
      </button>
    </div>
  );
}