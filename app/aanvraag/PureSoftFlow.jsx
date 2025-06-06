"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function PureSoftFlow() {
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState({
    doelgroep: "",
    waaromAanpassing: "",
    duurzaamheid: "",
    hoeveelheid: "",
    concurrentie: "",
    feedback: "",
    image: null,
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [errors, setErrors] = useState({});

  const handleBriefChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setBrief({ ...brief, image: files[0] });
    } else {
      setBrief({ ...brief, [name]: value });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    const isTooShort = (val) => !val || val.trim().length < 5;
    if (isTooShort(brief.doelgroep)) newErrors.doelgroep = "Omschrijf de doelgroep duidelijker (min. 5 tekens)";
    if (isTooShort(brief.waaromAanpassing)) newErrors.waaromAanpassing = "Geef een geldige reden voor aanpassing";
    if (isTooShort(brief.duurzaamheid)) newErrors.duurzaamheid = "Beschrijf de duurzaamheidsboodschap beter";
    if (!brief.hoeveelheid || isNaN(Number(brief.hoeveelheid))) newErrors.hoeveelheid = "Vul een geldig getal in";
    if (isTooShort(brief.concurrentie)) newErrors.concurrentie = "Noem minstens 1 concurrent";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Continue = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(brief).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append("gekozenDesign", selectedOption?.title);

    const response = await fetch("/api/submit-briefing", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Briefing succesvol verzonden naar het designteam!");
    } else {
      alert("Er ging iets mis bij het verzenden van de briefing.");
    }
  };

  const generateDesignPrompt = (brief) => {
    return `Packaging design for toilet paper.
Target audience: ${brief.doelgroep}.
Reason for redesign: ${brief.waaromAanpassing}.
Sustainability message: ${brief.duurzaamheid}.
Pack size: ${brief.hoeveelheid} rolls.
Competitor references: ${brief.concurrentie}.
Style: high quality, clean, eye-catching, suitable for Dutch retail shelves.
Use clear visual metaphors and modern design elements.`;
  };

  const designOptions = [
    {
      id: 1,
      title: "Zacht & Vertrouwd",
      description: "Pasteltinten, afgeronde vormen, focus op comfort en gezin.",
      image: "/designs/soft-trusted.jpg",
    },
    {
      id: 2,
      title: "Duurzaam & Modern",
      description: "Minimalistisch design, heldere iconen, groene accenten.",
      image: "/designs/sustainable-modern.jpg",
    },
    {
      id: 3,
      title: "Krachtig & Hygiënisch",
      description: "Strakkere kleuren, clean fonts, focus op sterkte & bescherming.",
      image: "/designs/strong-hygienic.jpg",
    },
  ];

  const designSuggestion = () => {
    const doelgroep = brief.doelgroep.toLowerCase();
    if (doelgroep.includes("gezinnen") || doelgroep.includes("kind")) return "Zacht & Vertrouwd";
    if (brief.duurzaamheid.toLowerCase().includes("eco") || brief.duurzaamheid.toLowerCase().includes("milieu")) return "Duurzaam & Modern";
    if (doelgroep.includes("jongeren") || doelgroep.includes("actie")) return "Krachtig & Hygiënisch";
    return null;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans text-[#2F2F2F]">
      <div className="mb-8">
        <Image src="/logo-ydretail.svg" alt="Yellow Dress Logo" width={160} height={40} />
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#00A9E0]">1. Start je aanvraag</h2>

          <div>
            <Input name="doelgroep" placeholder="Wie is de doelgroep?" onChange={handleBriefChange} />
            {errors.doelgroep && <p className="text-red-600 text-sm mt-1">{errors.doelgroep}</p>}
          </div>

          <div>
            <Textarea name="waaromAanpassing" placeholder="Waarom wijziging?" onChange={handleBriefChange} />
            {errors.waaromAanpassing && <p className="text-red-600 text-sm mt-1">{errors.waaromAanpassing}</p>}
          </div>

          <div>
            <Input name="duurzaamheid" placeholder="Duurzaamheidsboodschap" onChange={handleBriefChange} />
            {errors.duurzaamheid && <p className="text-red-600 text-sm mt-1">{errors.duurzaamheid}</p>}
          </div>

          <div>
            <Input name="hoeveelheid" placeholder="Aantal rollen" onChange={handleBriefChange} />
            {errors.hoeveelheid && <p className="text-red-600 text-sm mt-1">{errors.hoeveelheid}</p>}
          </div>

          <div>
            <Textarea name="concurrentie" placeholder="Concurrenten?" onChange={handleBriefChange} />
            {errors.concurrentie && <p className="text-red-600 text-sm mt-1">{errors.concurrentie}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">Upload afbeelding van huidige verpakking (optioneel)</label>
            <Input type="file" name="image" accept="image/*" onChange={handleBriefChange} />
          </div>

          <Button className="bg-[#00A9E0] text-white px-6 py-2 rounded-xl" onClick={handleStep1Continue}>
            Bekijk AI-ontwerpen
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#00A9E0]">2. Kies een designrichting</h2>
          {designSuggestion() && (
            <p className="text-sm text-gray-700 italic">
              Op basis van je input lijkt <strong>{designSuggestion()}</strong> goed aan te sluiten.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={`cursor-pointer rounded-xl shadow-md border-2 ${
                  selectedOption?.id === option.id ? "border-[#00A9E0]" : "border-transparent"
                }`}
              >
                <CardContent className="p-4 space-y-2">
                  <Image src={option.image} alt={option.title} width={300} height={200} className="rounded-md" />
                  <h3 className="text-lg font-semibold">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="bg-[#00A9E0] text-white px-6 py-2 rounded-xl"
            onClick={() => {
              const prompt = generateDesignPrompt(brief);
              alert(prompt); // straks vervangen met Firefly / Midjourney integratie
              setStep(3);
            }}
            disabled={!selectedOption}
          >
            Ga verder met dit design
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#00A9E0]">3. Feedback & Finetuning</h2>
          <p>
            Geselecteerde stijl: <strong>{selectedOption?.title}</strong>
          </p>
          {brief.image && (
            <div className="mt-4">
              <p className="text-sm mb-2 font-medium">Huidige verpakking:</p>
              <Image src={URL.createObjectURL(brief.image)} alt="Upload preview" width={300} height={200} className="rounded-md" />
            </div>
          )}
          <Textarea name="feedback" placeholder="Feedback op gekozen ontwerp" onChange={handleBriefChange} />
          <Button className="bg-[#00A9E0] text-white px-6 py-2 rounded-xl mt-2" onClick={handleSubmit}>
            Stuur naar designer
          </Button>
        </div>
      )}
    </div>
  );
}

