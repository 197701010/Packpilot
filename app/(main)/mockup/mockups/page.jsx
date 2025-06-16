// app/(main)/mockup/mockups/page.js (voorbeeld)

import Button from '@/components/ui/Button'; // Importeer je nieuwe Button
import { Box } from 'lucide-react';

export default function MockupsPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 bg-light rounded-lg shadow-inner">
      {/* Container voor de 'empty state' */}
      <div className="text-center bg-white p-10 rounded-xl shadow-sm border border-gray-200 max-w-lg">
        {/* Titel met het 'display' lettertype */}
        <h1 className="font-display text-4xl text-brand-primary mb-2">
          Mockup
        </h1>
        <p className="text-gray-600 mb-8">
          Create packaging mockups in seconds – upload your design, see realistic results. No Photoshop needed.
        </p>
        
        {/* De 'call to action' kaart */}
        <div className="bg-subtle border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center">
            <div className="bg-yellow-100 text-brand-accent p-3 rounded-full mb-4">
                <Box className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold text-dark mb-2">Let's get started</h2>
            <p className="text-gray-500 mb-6">You don't have any mockups yet, click below to begin.</p>
            
            {/* Hier gebruiken we onze nieuwe Button component! */}
            <Button href="/mockup/new"> {/* Pas de link aan naar de juiste pagina */}
                Get started
            </Button>
        </div>
        
        <p className="text-gray-400 mt-8 text-sm">
            (Hier komt straks het productoverzicht en mockup functionaliteit)
        </p>
      </div>
    </div>
  );
}