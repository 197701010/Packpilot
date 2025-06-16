'use client';

import Button from '@/components/ui/Button'; // Zorg dat de Button component geïmporteerd is

export default function LandingPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="flex flex-col items-center justify-center text-center py-20 lg:py-32">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-dark max-w-4xl leading-tight">
          Creëer Unieke Verpakkingsdesigns met AI
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Zet je ideeën binnen enkele minuten om in professionele verpakkingsontwerpen. Onze AI-gedreven tool helpt je bij het creëren van de perfecte uitstraling voor jouw product.
        </p>
        <div className="mt-10">
          <Button href="/aanvraag" className="py-4 px-8 text-lg">
            Start AI-Aanvraag
          </Button>
        </div>
      </div>
    </main>
  );
}