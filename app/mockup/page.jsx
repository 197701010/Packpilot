"use client";
import React from "react";
import { useRouter } from "next/navigation"; // ← importeer router

export default function MockupPage() {
  const router = useRouter(); // ← initialiseer router

  return (
    <main className="min-h-screen bg-[#fffdf9] py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-yd-red font-serif mb-4">
          Mockup
        </h1>
        <p className="text-gray-700 text-sm mb-10">
          Create packaging mockups in seconds – upload your design, see realistic results. No Photoshop needed.
        </p>

        <div className="flex flex-col items-center border border-dashed border-gray-300 rounded-xl p-10 bg-white mb-10">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold mb-2">Let's get started</h2>
          <p className="text-gray-600 mb-4 max-w-md">
            You don't have any mockups yet, click below to begin.
          </p>
          <button
            onClick={() => router.push("/mockup/new")} // ← hier de navigatie
            className="bg-yd-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition"
          >
            Get started
          </button>
        </div>

        <div className="text-center text-sm text-gray-400">
          (Hier komt straks het productoverzicht en mockup functionaliteit)
        </div>
      </div>
    </main>
  );
}
