// components/editor/UpscalePanel.jsx
import React from 'react';

export default function UpscalePanel() {
  return (
    <div>
      <h3 className="font-bold text-gray-800">Upscale your image</h3>
      <p className="text-sm text-gray-600 mt-1">Enhance its resolution and clarity.</p>
      <div className="mt-4">
        <p className="font-semibold text-sm mb-2">Select Scale:</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm">2x</button>
          <button className="px-4 py-2 bg-white border rounded-lg font-semibold text-sm hover:bg-gray-100">4x</button>
        </div>
      </div>
    </div>
  );
}