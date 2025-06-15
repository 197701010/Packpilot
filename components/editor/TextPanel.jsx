// components/editor/TextPanel.jsx
import React from 'react';
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi';

export default function TextPanel() {
  return (
    <div>
        <h3 className="font-bold text-gray-800 mb-2">New text</h3>
        <input type="text" placeholder="Enter updated text..." className="w-full p-2 border rounded-lg" />

        <div className="mt-4">
            <h3 className="font-bold text-gray-800 mb-2">Text alignment <span className="text-gray-400 font-normal">(optional)</span></h3>
            <div className="flex gap-2">
                <button className="flex-1 flex flex-col items-center p-2 border rounded-lg hover:bg-gray-100">
                    <FiAlignLeft /> <span className="text-xs mt-1">Default</span>
                </button>
                <button className="flex-1 flex flex-col items-center p-2 border rounded-lg hover:bg-gray-100">
                    <FiAlignLeft /> <span className="text-xs mt-1">Left</span>
                </button>
                <button className="flex-1 flex flex-col items-center p-2 border rounded-lg hover:bg-gray-100">
                    <FiAlignCenter /> <span className="text-xs mt-1">Center</span>
                </button>
                <button className="flex-1 flex flex-col items-center p-2 border rounded-lg hover:bg-gray-100">
                    <FiAlignRight /> <span className="text-xs mt-1">Right</span>
                </button>
            </div>
        </div>
    </div>
  );
}