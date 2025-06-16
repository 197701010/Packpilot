'use client';

import Button from '@/components/ui/Button';
import { Box } from 'lucide-react'; // We gebruiken een icoon uit de Lucide bibliotheek

export default function MockupPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 bg-subtle">
      <div className="text-center w-full max-w-3xl">
        {/* Pagina Titel */}
        <h1 className="font-display text-5xl text-brand-primary mb-3">
          Mockup
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Create packaging mockups in seconds – upload your design, see realistic results. No Photoshop needed.
        </p>
        
        {/* De 'call to action' kaart */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center">
            {/* Icoon */}
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-5">
                <Box className="w-10 h-10" />
            </div>
            {/* Kaart Titel & Tekst */}
            <h2 className="text-3xl font-semibold text-dark mb-2">Let's get started</h2>
            <p className="text-gray-500 mb-8">You don't have any mockups yet, click below to begin.</p>
            
            {/* Knop */}
            <Button href="/mockup/new">
                Get started
            </Button>
        </div>
        
        <p className="text-gray-400 mt-8 text-sm">
            (Hier komt straks het productoverzicht en mockup functionaliteit)
        </p>
      </div>
    </main>
  );
}