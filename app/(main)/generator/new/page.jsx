"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Je bestaande packagingTypes array
const packagingTypes = [
  { id: 'advent-calendar', name: 'Adventskalender', imageSrc: '/images/packaging/advent-calendar.jpg' },
  { id: 'aerosol-can', name: 'Spuitbus', imageSrc: '/images/packaging/aerosol-can.jpg' },
  { id: 'airless-pump-plastic-tube', name: 'Airless Pompflacon', imageSrc: '/images/packaging/airless-pump-plastic-tube.jpg' },
  { id: 'bar-flow-wrap', name: 'Reep-folie (Flow Wrap)', imageSrc: '/images/packaging/bar-flow-wrap.jpg' },
  { id: 'beer-bottle', name: 'Bierfles', imageSrc: '/images/packaging/beer-bottle.jpg' },
  { id: 'biscuit-tin', name: 'Koekblik', imageSrc: '/images/packaging/biscuit-tin.jpg' },
  { id: 'bordeaux-wine-bottle', name: 'Bordeaux Wijnfles', imageSrc: '/images/packaging/bordeaux-wine-bottle.jpg' },
  { id: 'box-with-window', name: 'Doos met Venster', imageSrc: '/images/packaging/box-with-window.jpg' },
  { id: 'cake-box', name: 'Taartdoos', imageSrc: '/images/packaging/cake-box.jpg' },
  { id: 'carton-box', name: 'Kartonnen Doos', imageSrc: '/images/packaging/carton-box.jpg' },
  { id: 'champagne-bottle', name: 'Champagnefles', imageSrc: '/images/packaging/champagne-bottle.jpg' },
  { id: 'cosmetic-squeeze-bottle', name: 'Cosmetische Knijpfles', imageSrc: '/images/packaging/cosmetic-squeeze-bottle.jpg' },
  { id: 'cream-jar', name: 'Crèmepot', imageSrc: '/images/packaging/cream-jar.jpg' },
  { id: 'cup-noodles', name: 'Beker Noedels', imageSrc: '/images/packaging/cup-noodles.jpg' },
  { id: 'drawstring-bag', name: 'Trekkoordzakje', imageSrc: '/images/packaging/drawstring-bag.jpg' },
  { id: 'drinks-can', name: 'Drankblikje', imageSrc: '/images/packaging/drinks-can.jpg' },
  { id: 'dropper-bottle', name: 'Pipetfles', imageSrc: '/images/packaging/dropper-bottle.jpg' },
  { id: 'fish-can', name: 'Visblik', imageSrc: '/images/packaging/fish-can.jpg' },
  { id: 'foil-wrap-with-paper-sleeve', name: 'Folie met Papieren Wikkel', imageSrc: '/images/packaging/foil-wrap-with-paper-sleeve.jpg' },
  { id: 'food-glass-jar', name: 'Glazen Voedselpot', imageSrc: '/images/packaging/food-glass-jar.jpg' },
  { id: 'food-pouch', name: 'Voedselzak', imageSrc: '/images/packaging/food-pouch.jpg' },
  { id: 'frozen-food-bag', name: 'Diepvrieszak', imageSrc: '/images/packaging/frozen-food-bag.jpg' },
  { id: 'ice-cream-tub', name: 'IJsbeker', imageSrc: '/images/packaging/ice-cream-tub.jpg' },
  { id: 'liquid-carton', name: 'Drankkarton', imageSrc: '/images/packaging/liquid-carton.jpg' },
  { id: 'long-neck-glass-bottle', name: 'Langhalsfles', imageSrc: '/images/packaging/long-neck-glass-bottle.jpg' },
  { id: 'luxury-retail-bag', name: 'Luxe Draagtas', imageSrc: '/images/packaging/luxury-retail-bag.jpg' },
  { id: 'mailer-box', name: 'Verzenddoos', imageSrc: '/images/packaging/mailer-box.jpg' },
  { id: 'mailer-box-with-belly-band', name: 'Verzenddoos met Buikband', imageSrc: '/images/packaging/mailer-box-with-belly-band.jpg' },
  { id: 'mint-spray-bottle', name: 'Muntspray', imageSrc: '/images/packaging/mint-spray-bottle.jpg' },
  { id: 'perfume-bottle', name: 'Parfumfles', imageSrc: '/images/packaging/perfume-bottle.jpg' },
  { id: 'pillow-box', name: 'Kussendoosje', imageSrc: '/images/packaging/pillow-box.jpg' },
  { id: 'pills-bottle', name: 'Pillenflesje', imageSrc: '/images/packaging/pills-bottle.jpg' },
  { id: 'plastic-cosmetic-tube', name: 'Plastic Cosmetische Tube', imageSrc: '/images/packaging/plastic-cosmetic-tube.jpg' },
  { id: 'plastic-food-tub', name: 'Plastic Voedselbakje', imageSrc: '/images/packaging/plastic-food-tub.jpg' },
  { id: 'plastic-mailing-bag', name: 'Plastic Verzendzak', imageSrc: '/images/packaging/plastic-mailing-bag.jpg' },
  { id: 'pump-bottle', name: 'Pompfles', imageSrc: '/images/packaging/pump-bottle.jpg' },
  { id: 'rectangular-plastic-drinks-bottle', name: 'Rechthoekige Plastic Fles', imageSrc: '/images/packaging/rectangular-plastic-drinks-bottle.jpg' },
  { id: 'round-plastic-drinks-bottle', name: 'Ronde Plastic Fles', imageSrc: '/images/packaging/round-plastic-drinks-bottle.jpg' },
  { id: 'round-tin', name: 'Rond Blik', imageSrc: '/images/packaging/round-tin.jpg' },
  { id: 'shelf-display-box', name: 'Schapdisplay (Doos)', imageSrc: '/images/packaging/shelf-display-box.jpg' },
  { id: 'shipping-box', name: 'Grote Verzenddoos', imageSrc: '/images/packaging/shipping-box.jpg' },
  { id: 'short-neck-glass-bottle', name: 'Korthalsfles', imageSrc: '/images/packaging/short-neck-glass-bottle.jpg' },
  { id: 'shoulder-and-neck-rigid-box', name: 'Halsdoos', imageSrc: '/images/packaging/shoulder-and-neck-rigid-box.jpg' },
  { id: 'sleeve-and-tray-rigid-box', name: 'Schuifdoos (Huls & Lade)', imageSrc: '/images/packaging/sleeve-and-tray-rigid-box.jpg' },
  { id: 'spice-jar', name: 'Kruidenpotje', imageSrc: '/images/packaging/spice-jar.jpg' },
  { id: 'spray-bottle', name: 'Sprayflacon', imageSrc: '/images/packaging/spray-bottle.jpg' },
  { id: 'standard-retail-bag', name: 'Standaard Draagtas', imageSrc: '/images/packaging/standard-retail-bag.jpg' },
  { id: 'standard-sachet', name: 'Sachet', imageSrc: '/images/packaging/standard-sachet.jpg' },
  { id: 'standup-pouch', name: 'Stazak', imageSrc: '/images/packaging/standup-pouch.jpg' },
  { id: 'stick-pack', name: 'Stick Pack', imageSrc: '/images/packaging/stick-pack.jpg' },
  { id: 'swing-top-bottle', name: 'Beugelfles', imageSrc: '/images/packaging/swing-top-bottle.jpg' },
  { id: 'tall-yoghurt-pot', name: 'Hoge Yoghurtbeker', imageSrc: '/images/packaging/tall-yoghurt-pot.jpg' },
  { id: 'tin-can', name: 'Conservenblik', imageSrc: '/images/packaging/tin-can.jpg' },
  { id: 'tube', name: 'Tube', imageSrc: '/images/packaging/tube.jpg' },
  { id: 'vinyl-album-cover', name: 'Platenhoes', imageSrc: '/images/packaging/vinyl-album-cover.jpg' },
];

export default function SelectPackagingPage() {
  const router = useRouter();
  const [selectedPackaging, setSelectedPackaging] = useState(null);
  
  // ← NIEUWE STATE VOOR AI SERVICE
  const [aiService, setAiService] = useState('replicate');

  // ← NIEUWE AI SERVICE SELECTOR COMPONENT
  const AIServiceSelector = ({ selectedService, onServiceChange }) => {
    const services = [
      {
        id: 'replicate',
        name: 'Replicate',
        description: 'Stable Diffusion - Bewezen kwaliteit',
        speed: 'Gemiddeld (1-3 min)',
        icon: '🎯'
      },
      {
        id: 'flux',
        name: 'Black Forest Labs (Flux)',
        description: 'Nieuwste AI technologie',
        speed: 'Snel (30s-2 min)',
        icon: '🌲'
      }
    ];

    return (
      <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Service</h2>
          <p className="text-sm text-gray-600">Kies welke AI service je wilt gebruiken</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-md ${
                selectedService === service.id
                  ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => onServiceChange(service.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{service.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="aiService"
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={() => onServiceChange(service.id)}
                      className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <h3 className="text-sm font-semibold text-gray-900">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {service.speed}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              {selectedService === 'replicate' ? 'Replicate' : 'Black Forest Labs'} geselecteerd
            </span>
          </div>
        )}
      </div>
    );
  };

  const handleNext = () => {
    if (!selectedPackaging) {
      alert("Selecteer alstublieft een verpakkingstype.");
      return;
    }
    
    // ← UPDATED: Voeg aiService toe aan de URL parameters
    router.push(`/generator/color?packaging=${selectedPackaging}&aiService=${aiService}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="w-full max-w-6xl">
        <div className="text-left mb-8">
          <p className="text-sm font-bold text-gray-500 tracking-wider">KIES JE VERPAKKING</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Kies je verpakking</h1>
        </div>

        {/* ← NIEUWE AI SERVICE SELECTOR */}
        <AIServiceSelector 
          selectedService={aiService}
          onServiceChange={setAiService}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {packagingTypes.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackaging(pkg.id)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 group ${
                selectedPackaging === pkg.id ? 'ring-4 ring-purple-600' : 'ring-2 ring-transparent'
              }`}
            >
              <img src={pkg.imageSrc} alt={pkg.name} className="w-full h-full object-cover aspect-square" />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-end justify-start p-3">
                <h2 className="text-white text-lg font-bold drop-shadow-md">{pkg.name}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleNext}
            disabled={!selectedPackaging}
            className="px-10 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            Volgende
          </button>
        </div>
      </div>
    </div>
  );
}