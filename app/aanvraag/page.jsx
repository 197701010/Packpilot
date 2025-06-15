"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AanvraagPage() {
  const router = useRouter();
  const [bedrijf, setBedrijf] = useState("");
  const [slogan, setSlogan] = useState("");
  const [rol, setRol] = useState("");
  const [doelen, setDoelen] = useState([]);
  const [tools, setTools] = useState([]);

  const doelenOpties = [
    "Create packaging designs",
    "Get custom dielines",
    "Create packaging mockups",
    "Create AI product photography",
    "Generate early design concepts",
    "Something else",
  ];

  const toolsOpties = [
    "Photoshop",
    "Illustrator",
    "Canva (or similar)",
    "AI image generator (Midjourney, DALL-E, etc)",
    "3D tools (Blender, KeyShot, etc)",
    "Packaging CAD Software",
    "None of these",
    "Other",
  ];

  const toggleCheckbox = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bedrijf || !rol || rol === "Selecteer je rol") {
      return alert("Vul alle verplichte velden correct in.");
    }
    router.replace("/toolkeuze");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg max-w-3xl mx-auto border border-gray-200"
      >
        <h2 className="text-4xl font-bold text-center text-yd-red mb-2 font-serif">
          Welkom bij PackPilot
        </h2>
        <p className="text-center text-gray-700 mb-8 text-lg">
          Personaliseer je ervaring
        </p>

        {/* Bedrijfsnaam */}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Bedrijfsnaam
        </label>
        <input
          type="text"
          value={bedrijf}
          onChange={(e) => setBedrijf(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yd-red"
          placeholder="Je bedrijfsnaam"
          required
        />

        {/* Slogan */}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Slogan (optioneel)
        </label>
        <input
          type="text"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-yd-red"
          placeholder="Bijv. Slimmere designs, sneller"
        />

        {/* Rol */}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Wat is je rol?
        </label>
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-yd-red"
          required
        >
          <option>Selecteer je rol</option>
          <option>Founder / Business owner</option>
          <option>Brand / Marketing</option>
          <option>Graphic or Packaging Design</option>
          <option>Packaging supplier</option>
          <option>Sales</option>
          <option>Other</option>
        </select>

        {/* Waarom gebruik je PackPilot */}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Waarom gebruik je PackPilot?
        </label>
        <div className="space-y-2 mb-6">
          {doelenOpties.map((item) => (
            <label key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={doelen.includes(item)}
                onChange={() => toggleCheckbox(item, doelen, setDoelen)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>

        {/* Tools */}
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Welke tools gebruik je?
        </label>
        <div className="space-y-2 mb-8">
          {toolsOpties.map((tool) => (
            <label key={tool} className="flex items-center">
              <input
                type="checkbox"
                checked={tools.includes(tool)}
                onChange={() => toggleCheckbox(tool, tools, setTools)}
                className="mr-2"
              />
              {tool}
            </label>
          ))}
        </div>

        {/* CTA knop */}
        <button
          type="submit"
          className="w-full bg-yd-red text-white py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition uppercase tracking-wide shadow-lg"
        >
          Get Started
        </button>
      </form>
    </main>
  );
}
