"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToolkeuzePage() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const tools = [
    {
      titel: "Generator",
      beschrijving: "Genereer creatieve verpakkingsideeën op basis van je input.",
      icoon: "✨",
      link: "/generator",
    },
    {
      titel: "Mockup",
      beschrijving: "Maak realistische mockups van je verpakking.",
      icoon: "📦",
      link: "/mockup",
    },
    {
      titel: "Editor",
      beschrijving: "Pas ontwerpen aan met krachtige tools zonder designskills.",
      icoon: "🖌️",
      link: "/editor",
    },
    {
      titel: "Collecties",
      beschrijving: "Bekijk en organiseer je gegenereerde ontwerpen.",
      icoon: "🗂️",
      link: "/collecties",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fffdf9] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-yd-red font-serif mb-2">
          Kies je volgende stap
        </h1>
        <p className="text-gray-700 text-lg mb-10">Wat wil je doen?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.titel}
              onClick={() => router.push(tool.link)}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-gray-200 transition"
            >
              <div className="text-5xl mb-3">{tool.icoon}</div>
              <h3 className="text-xl font-bold text-yd-red mb-1">{tool.titel}</h3>
              <p className="text-sm text-gray-600">{tool.beschrijving}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}


