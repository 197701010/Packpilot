"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function MockupPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { naam: "Advent calendar", emoji: "📅" },
    { naam: "Bar flow wrapper", emoji: "🍫" },
    { naam: "Beer bottle", emoji: "🍺" },
    { naam: "Carton box", emoji: "📦" },
    { naam: "Cosmetic bottle", emoji: "🧴" },
    { naam: "Crisp packet", emoji: "🍟" },
    { naam: "Drinks can (250ml)", emoji: "🥤" },
    { naam: "Drinks can (330ml)", emoji: "🥤" },
    { naam: "Food glass jar", emoji: "🍯" },
    { naam: "Food pouch", emoji: "🍪" },
    { naam: "Dropper bottle", emoji: "💧" },
    { naam: "Mist spray", emoji: "🌫️" },
    { naam: "Supplement bottle", emoji: "💊" },
    { naam: "Liquid carton", emoji: "🧃" },
    { naam: "Mailer box", emoji: "📬" },
    { naam: "Perfume bottle", emoji: "🌸" },
    { naam: "Pump bottle", emoji: "🧼" },
    { naam: "Shipping box", emoji: "📦" },
    { naam: "Stand-up pouch", emoji: "🥡" },
    { naam: "Tube", emoji: "🧴" },
    { naam: "Wine bottle", emoji: "🍷" },
  ];

  const handleStart = () => {
    if (selectedProduct) {
      router.push("/mockup/color");
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdf9] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-yd-red font-serif mb-4">
          Mockup
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Kies een verpakkingstype waarvoor je een mockup wilt maken.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <button
              key={product.naam}
              onClick={() => setSelectedProduct(product.naam)}
              className={`flex flex-col items-center justify-center p-6 border rounded-2xl shadow hover:shadow-lg transition text-sm text-gray-700 ${
                selectedProduct === product.naam
                  ? "border-yd-red bg-red-50"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-4xl mb-2">{product.emoji}</div>
              <div className="font-semibold text-center">{product.naam}</div>
            </button>
          ))}
        </div>

        {selectedProduct && (
          <div className="mt-10 text-center">
            <p className="text-lg font-medium text-gray-800">
              Geselecteerd: <span className="text-yd-red">{selectedProduct}</span>
            </p>
            <button
              onClick={handleStart}
              className="mt-4 px-6 py-3 bg-yd-red text-white font-bold rounded-xl shadow hover:bg-red-700 transition"
            >
              Mockup starten
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
