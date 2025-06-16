'use client';

import Button from '@/components/ui/Button';
import { Sparkles } from 'lucide-react'; // We gebruiken een ander icoon, maar uit dezelfde bibliotheek

export default function GeneratorPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 bg-subtle">
      <div className="text-center w-full max-w-3xl">
        {/* Pagina Titel (aangepast) */}
        <h1 className="font-display text-5xl text-brand-primary mb-3">
          Generator
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Genereer creatieve verpakkingsideeën – voer je prompt in, kies je kleuren, laat je visie tot leven komen.
        </p>
        
        {/* De 'call to action' kaart (identieke stijl) */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center">
            {/* Icoon (aangepast) */}
            <div className="bg-red-100 text-red-600 p-4 rounded-full mb-5">
                <Sparkles className="w-10 h-10" />
            </div>
            {/* Kaart Titel & Tekst (aangepast) */}
            <h2 className="text-3xl font-semibold text-dark mb-2">Let's get started</h2>
            <p className="text-gray-500 mb-8">You don't have any generations yet, click below to begin.</p>
            
            {/* Knop */}
            <Button href="/generator/new">
                Get started
            </Button>
        </div>
        
        <p className="text-gray-400 mt-8 text-sm">
            (Hier komt straks het overzicht van gegenereerde ideeën)
        </p>
      </div>
    </main>
  );
}