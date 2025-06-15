"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function GeneratorHomePage() {
  const router = useRouter();

  const handleStart = () => {
    // Stuur de gebruiker naar de pagina om een verpakking te kiezen
    router.push('/generator/new');
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center pt-20 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-serif text-red-700">Generator</h1>
        <p className="text-gray-600 mt-4 max-w-md">
          Genereer creatieve verpakkingsideeën – voer je prompt in, kies je kleuren, laat je visie tot leven komen.
        </p>
      </div>

      <div className="mt-12 w-full max-w-2xl bg-white rounded-2xl shadow-sm p-16 flex flex-col items-center text-center">
        {/* Je kunt hier een echt icoon of afbeelding plaatsen */}
        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 text-xs flex items-center justify-center">
            Icon
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Let's get started</h2>
        <p className="text-gray-500 mt-2">You don't have any generations yet, click below to begin.</p>
        <button
          onClick={handleStart}
          className="mt-6 px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Get started
        </button>
      </div>

      <div className="mt-8 text-gray-500">
        <p>(Hier komt straks het overzicht van gegenereerde ideeën)</p>
      </div>
    </div>
  );
}