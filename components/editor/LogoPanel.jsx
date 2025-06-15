import React from 'react';

export default function LogoPanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
            <button className="font-semibold text-purple-600 border-b-2 border-purple-600 pb-1">Select</button>
            <button className="font-semibold text-gray-500 pb-1">Deselect</button>
        </div>
      </div>
      <div className="mt-4">
          <input type="range" className="w-full" />
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-gray-800 mb-2">Upload logo</h3>
        <p className="text-sm text-gray-600 mb-2">You can edit up to 4 painted areas at one time.</p>
        <div className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <p className="text-sm text-purple-600 font-semibold">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">max. 55MB</p>
        </div>
      </div>
    </div>
  );
}