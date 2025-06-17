'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <div className="w-full h-48 md:h-64 overflow-hidden">
        <img 
          src="/hero-banner.jpg" 
          alt="Abstracte afbeelding van verpakkingen"
          className="w-full h-full object-cover"
        />
      </div>

      <main className="flex-1 bg-white">
        <div className="flex flex-col items-center justify-center text-center py-20 lg:py-32 -mt-24 md:-mt-32 relative z-10">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-dark max-w-4xl leading-tight">
            Creëer Unieke Verpakkingsdesigns met AI
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            Zet je ideeën binnen enkele minuten om in professionele verpakkingsontwerpen. Onze AI-gedreven tool helpt je bij het creëren van de perfecte uitstraling voor jouw product.
          </p>
          <div className="mt-10">
            {/* HIER IS DE CORRECTIE: href="/aanvraag" */}
            <Button asChild size="lg">
              <Link href="/aanvraag">Start AI-Aanvraag</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}