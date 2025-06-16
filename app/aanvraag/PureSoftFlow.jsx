"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Helper component voor een consistente sectie-titel
const StepTitle = ({ number, children }) => (
  <h2 className="text-4xl font-serif font-bold text-yd-black">
    <span className="text-yd-red">{number}.</span> {children}
  </h2>
);

// Helper component voor een consistent input-veld met label en foutmelding
const FormField = ({ label, name, children, error }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-semibold font-sans text-yd-black">
      {label}
    </label>
    {children}
    {error && <p className="text-yd-red text-sm mt-1">{error}</p>}
  </div>
);

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
    // ... (deze logica blijft ongewijzigd) ...
  };
  
  // ... (de andere functies zoals generateDesignPrompt blijven ongewijzigd) ...

  const designOptions = [
    { id: 1, title: "Zacht & Vertrouwd", description: "Pasteltinten, afgeronde vormen, focus op comfort en gezin.", image: "/designs/soft-trusted.jpg" },
    { id: 2, title: "Duurzaam & Modern", description: "Minimalistisch design, heldere iconen, groene accenten.", image: "/designs/sustainable-modern.jpg" },
    { id: 3, title: "Krachtig & Hygiënisch", description: "Strakkere kleuren, clean fonts, focus op sterkte & bescherming.", image: "/designs/strong-hygienic.jpg" },
  ];
  
  // Standaard styling voor de UI componenten
  const inputStyles = "font-sans bg-white border-gray-300 rounded-md focus:ring-yd-red focus:border-yd-red";

  return (
    // De container heeft nu een padding die past bij de rest van de site
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      {step === 1 && (
        <div className="space-y-8">
          <StepTitle number={1}>Start je aanvraag</StepTitle>

          <FormField label="Wie is de doelgroep?" name="doelgroep" error={errors.doelgroep}>
            <Input name="doelgroep" placeholder="Bijv. jonge gezinnen, milieubewuste consumenten" onChange={handleBriefChange} className={inputStyles} />
          </FormField>

          <FormField label="Waarom is een aanpassing van de verpakking nodig?" name="waaromAanpassing" error={errors.waaromAanpassing}>
            <Textarea name="waaromAanpassing" placeholder="Bijv. nieuwe productformule, veranderde markt, feedback van klanten" onChange={handleBriefChange} className={inputStyles} />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField label="Wat is de duurzaamheidsboodschap?" name="duurzaamheid" error={errors.duurzaamheid}>
              <Input name="duurzaamheid" placeholder="Bijv. 100% gerecycled, plasticvrij" onChange={handleBriefChange} className={inputStyles} />
            </FormField>
            <FormField label="Aantal rollen per verpakking" name="hoeveelheid" error={errors.hoeveelheid}>
              <Input name="hoeveelheid" placeholder="Bijv. 6, 12, 24" onChange={handleBriefChange} className={inputStyles} />
            </FormField>
          </div>

          <FormField label="Welke concurrenten moeten we bekijken?" name="concurrentie" error={errors.concurrentie}>
            <Textarea name="concurrentie" placeholder="Noem 1 tot 3 concurrenten en beschrijf kort hun stijl" onChange={handleBriefChange} className={inputStyles} />
          </FormField>

          <FormField label="Upload afbeelding van huidige verpakking (optioneel)" name="image">
            <Input type="file" name="image" accept="image/*" onChange={handleBriefChange} className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yd-gray file:text-yd-black hover:file:bg-yd-yellow`} />
          </FormField>

          <Button className="font-sans text-base font-bold uppercase tracking-widest text-white bg-yd-red hover:bg-opacity-90 px-8 py-4 rounded-md transition shadow-lg hover:shadow-xl w-full md:w-auto" onClick={handleStep1Continue}>
            Bekijk AI-ontwerpen
          </Button>
        </div>
      )}

      {step === 2 && (
         <div className="space-y-8 text-center">
            <StepTitle number={2}>Kies een designrichting</StepTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {designOptions.map((option) => (
                <Card
                  key={option.id}
                  onClick={() => setSelectedOption(option)}
                  className={`cursor-pointer rounded-xl shadow-md border-4 transition-all duration-300 ${
                    selectedOption?.id === option.id ? "border-yd-yellow scale-105" : "border-transparent"
                  }`}
                >
                  <CardContent className="p-4 space-y-3 text-left">
                    <Image src={option.image} alt={option.title} width={300} height={200} className="rounded-md w-full" />
                    <h3 className="text-xl font-serif font-bold">{option.title}</h3>
                    <p className="text-sm font-sans text-gray-600">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <Button className="font-sans text-base font-bold uppercase tracking-widest text-white bg-yd-red hover:bg-opacity-90 px-8 py-4 rounded-md transition shadow-lg hover:shadow-xl w-full md:w-auto" onClick={() => setStep(3)} disabled={!selectedOption}>
                Ga verder met dit design
            </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8">
            <StepTitle number={3}>Feedback & Finetuning</StepTitle>
             <div className="bg-yd-gray p-6 rounded-lg">
                <p className="font-sans">Geselecteerde stijl: <strong className="font-serif text-lg">{selectedOption?.title}</strong></p>
                {brief.image && (
                  <div className="mt-4">
                    <p className="text-sm mb-2 font-semibold font-sans">Huidige verpakking ter referentie:</p>
                    <Image src={URL.createObjectURL(brief.image)} alt="Upload preview" width={200} height={200} className="rounded-md" />
                  </div>
                )}
            </div>
            <FormField label="Wat is je feedback op het gekozen ontwerp?" name="feedback">
                <Textarea name="feedback" placeholder="Bijv. 'Ik vind de kleuren mooi, maar het logo mag groter...'" onChange={handleBriefChange} className={inputStyles} rows={5}/>
            </FormField>
            <Button className="font-sans text-base font-bold uppercase tracking-widest text-white bg-yd-red hover:bg-opacity-90 px-8 py-4 rounded-md transition shadow-lg hover:shadow-xl w-full md:w-auto" onClick={handleSubmit}>
                Verstuur naar designer
            </Button>
        </div>
      )}
    </div>
  );
}
