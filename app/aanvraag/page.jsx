'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function OnboardingPage() { // Naam van component duidelijker gemaakt
  const router = useRouter();
  const [bedrijf, setBedrijf] = useState("");
  const [slogan, setSlogan] = useState("");
  const [rol, setRol] = useState("");
  const [doelen, setDoelen] = useState([]);
  const [tools, setTools] = useState([]);

  const doelenOpties = [
    "Create packaging designs", "Get custom dielines", "Create packaging mockups",
    "Create AI product photography", "Generate early design concepts", "Something else",
  ];

  const toolsOpties = [
    "Photoshop", "Illustrator", "Canva (or similar)", "AI image generator (Midjourney, DALL-E, etc)",
    "3D tools (Blender, KeyShot, etc)", "Packaging CAD Software", "None of these", "Other",
  ];

  const toggleCheckbox = (item, list, setList) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bedrijf || !rol || rol === "Selecteer je rol") {
      return alert("Vul alle verplichte velden correct in.");
    }
    // HIER IS DE REGEL DIE JE ZOCHT.
    // We veranderen "/toolkeuze" naar "/dashboard".
    router.replace("/dashboard");
  };

  return (
    <main className="min-h-screen bg-subtle py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg max-w-3xl mx-auto border border-gray-200"
      >
        <h2 className="text-4xl font-bold text-center text-brand-primary mb-2 font-display">
          Welkom bij PackPilot
        </h2>
        <p className="text-center text-gray-700 mb-8 text-lg">
          Personaliseer je ervaring
        </p>

        <div className="mb-4">
            <label htmlFor="bedrijf" className="block mb-2 text-sm font-medium text-dark">Bedrijfsnaam</label>
            <Input id="bedrijf" type="text" value={bedrijf} onChange={(e) => setBedrijf(e.target.value)} placeholder="Je bedrijfsnaam" required />
        </div>

        <div className="mb-6">
            <label htmlFor="slogan" className="block mb-2 text-sm font-medium text-dark">Slogan (optioneel)</label>
            <Input id="slogan" type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} placeholder="Bijv. Slimmere designs, sneller" />
        </div>

        <div className="mb-6">
            <label htmlFor="rol" className="block mb-2 text-sm font-medium text-dark">Wat is je rol?</label>
            <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)} className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50" required >
                <option>Selecteer je rol</option>
                <option>Founder / Business owner</option>
                <option>Brand / Marketing</option>
                <option>Graphic or Packaging Design</option>
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            <div>
                <label className="block mb-4 text-sm font-medium text-dark">Waarom gebruik je PackPilot?</label>
                <div className="space-y-3">
                {doelenOpties.map((item) => (
                    <label key={item} className="flex items-center text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={doelen.includes(item)} onChange={() => toggleCheckbox(item, doelen, setDoelen)} className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/50" />
                        <span className="ml-3">{item}</span>
                    </label>
                ))}
                </div>
            </div>
            <div>
                <label className="block mb-4 text-sm font-medium text-dark">Welke tools gebruik je?</label>
                <div className="space-y-3">
                {toolsOpties.map((tool) => (
                    <label key={tool} className="flex items-center text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={tools.includes(tool)} onChange={() => toggleCheckbox(tool, tools, setTools)} className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary/50" />
                        <span className="ml-3">{tool}</span>
                    </label>
                ))}
                </div>
            </div>
        </div>

        <Button type="submit" className="w-full text-lg uppercase tracking-wide">
            Get Started
        </Button>
      </form>
    </main>
  );
}