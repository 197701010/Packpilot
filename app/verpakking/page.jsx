"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerpakkingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const opties = [
    { naam: "Fles", omschrijving: "Glazen of plastic flessen", emoji: "🍾" },
    { naam: "Blik", omschrijving: "Metalen blikjes en potten", emoji: "🥫" },
    { naam: "Glazen pot", omschrijving: "Glazen potten en containers", emoji: "🍯" },
    { naam: "Pouch", omschrijving: "Flexibele verpakkingen", emoji: "🎒" },
    { naam: "Doos", omschrijving: "Kartonnen dozen", emoji: "📦" },
    { naam: "Zak", omschrijving: "Papieren en plastic zakken", emoji: "🛍️" },
    { naam: "Tube", omschrijving: "Cosmetica en tandpasta tubes", emoji: "🧴" },
    { naam: "Karton", omschrijving: "Melkpakken en sappen", emoji: "🧃" },
  ];

  return (
    <main className="min-h-screen bg-[#fffdf9] py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-yd-red font-serif mb-2">
          Kies je verpakking
        </h1>
        <p className="text-gray-700 text-lg mb-10">
          Selecteer het type verpakking waarvoor je een ontwerp wilt maken
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {opties.map((optie) => (
            <button
              key={optie.naam}
              onClick={() => setSelected(optie.naam)}
              className={`rounded-2xl border p-6 transition text-center shadow-sm hover:shadow-md ${
                selected === optie.naam
                  ? "border-yd-red bg-yd-gray"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="text-4xl mb-2">{optie.emoji}</div>
              <h3 className="font-semibold text-lg text-yd-red mb-1">
                {optie.naam}
              </h3>
              <p className="text-sm text-gray-600 leading-tight">
                {optie.omschrijving}
              </p>
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          onClick={() => router.push("/generator")}
          className={`mt-10 px-8 py-3 rounded-xl text-white text-lg font-bold shadow-md transition ${
            selected ? "bg-yd-red hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Volgende
        </button>
      </div>
    </main>
  );
}

