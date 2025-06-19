'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { ArrowRight, Sparkles, Clock, Zap } from 'lucide-react';

const packagingTypes = [
  'Doos', 'Fles', 'Blik', 'Tube', 'Zakje', 'Pot', 'Karton', 'Wrapper'
];

const colors = [
  'Rood', 'Blauw', 'Groen', 'Geel', 'Oranje', 'Paars', 'Roze', 'Zwart', 
  'Wit', 'Grijs', 'Bruin', 'Beige', 'Goud', 'Zilver'
];

const styles = [
  'Modern', 'Vintage', 'Minimalistisch', 'Bold', 'Elegant', 'Playful', 
  'Professional', 'Organic', 'Luxe', 'Industrieel'
];

export default function GeneratorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [packagingType, setPackagingType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [packagingLook, setPackagingLook] = useState('');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [imageCount, setImageCount] = useState(1);
  const [aiService, setAiService] = useState('bfl');

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleStyleToggle = (style) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const isFormValid = () => {
    return packagingType && selectedColors.length > 0 && selectedStyles.length > 0;
  };

  const getEstimatedTime = () => {
    if (aiService === 'bfl') {
      return `${Math.ceil(imageCount * 0.5)}-${imageCount * 2} minuten`;
    } else {
      return `${imageCount * 8}-${imageCount * 15} minuten`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert('Vul alle verplichte velden in (packaging type, minimaal 1 kleur, minimaal 1 stijl)');
      return;
    }

    setIsLoading(true);

    try {
      console.log('🚀 Starting generation with:', {
        packagingType,
        colors: selectedColors,
        styles: selectedStyles,
        imageCount,
        aiService
      });

      const response = await fetch('/api/generator/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packagingType,
          companyName,
          slogan,
          logoFile,
          colors: selectedColors,
          prompt: customPrompt,
          packagingLook,
          styles: selectedStyles,
          imageCount,
          aiService
        })
      });

      const prediction = await response.json();
      console.log('📊 API Response:', prediction);

      if (prediction.success) {
        // Smart redirect logic
        let redirectUrl;
        
        if (prediction.redirect_url) {
          redirectUrl = prediction.redirect_url;
        } else if (prediction.batch && prediction.requests?.length > 0) {
          const batchIds = prediction.requests.map(r => r.id).join(',');
          redirectUrl = `/generator/results/${prediction.requests[0].id}?batch=${batchIds}&total=${prediction.requests.length}`;
        } else if (prediction.id) {
          redirectUrl = `/generator/results/${prediction.id}`;
        } else {
          throw new Error('Geen geldige response ontvangen');
        }
        
        console.log('🔄 Redirecting to:', redirectUrl);
        router.push(redirectUrl);
      } else {
        throw new Error(prediction.error || 'Er is een fout opgetreden');
      }
    } catch (error) {
      console.error('❌ Generation error:', error);
      alert(`Er is een fout opgetreden: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Packaging Generator</h1>
        <p className="text-gray-600 text-lg">
          Genereer professionele packaging ontwerpen met AI in minuten
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* AI Service Selection */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">🤖 AI Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`cursor-pointer p-3 border rounded-lg transition-colors ${
              aiService === 'bfl' ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-300'
            }`}>
              <input
                type="radio"
                name="aiService"
                value="bfl"
                checked={aiService === 'bfl'}
                onChange={(e) => setAiService(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-600" />
                    Black Forest Labs
                  </div>
                  <div className="text-sm text-gray-600">Snel, 30s-2min per image</div>
                </div>
                <div className="text-green-600 font-bold">Aanbevolen</div>
              </div>
            </label>
            
            <label className={`cursor-pointer p-3 border rounded-lg transition-colors ${
              aiService === 'replicate' ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-300'
            }`}>
              <input
                type="radio"
                name="aiService"
                value="replicate"
                checked={aiService === 'replicate'}
                onChange={(e) => setAiService(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    Replicate
                  </div>
                  <div className="text-sm text-gray-600">Langzaam, 8-15min per image</div>
                </div>
                <div className="text-orange-600 font-bold">Backup</div>
              </div>
            </label>
          </div>
        </div>

        {/* Image Count */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">📊 Aantal Ontwerpen (Max 3 voor optimale snelheid)</h3>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="3"
              value={imageCount}
              onChange={(e) => setImageCount(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((imageCount-1)/2)*100}%, #e5e7eb ${((imageCount-1)/2)*100}%, #e5e7eb 100%)`
              }}
            />
            <div className="text-2xl font-bold text-green-600 min-w-[3rem] text-center">
              {imageCount}
            </div>
          </div>
          
          {/* Visual indicators */}
          <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
            <span className={imageCount === 1 ? 'font-bold text-green-600' : ''}>1</span>
            <span className={imageCount === 2 ? 'font-bold text-green-600' : ''}>2</span>
            <span className={imageCount === 3 ? 'font-bold text-green-600' : ''}>3</span>
          </div>
          
          <div className="text-sm text-gray-600 mt-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Geschatte tijd: {getEstimatedTime()}
          </div>
        </div>

        {/* Packaging Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📦 Packaging Type *
          </label>
          <select
            value={packagingType}
            onChange={(e) => setPackagingType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecteer packaging type</option>
            {packagingTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏢 Bedrijfsnaam (Optioneel)
            </label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Bijv. Royal Delights"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💬 Slogan (Optioneel)
            </label>
            <Input
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Bijv. Premium Quality"
            />
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎨 Kleuren (Minimaal 1) *
          </label>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {colors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorToggle(color)}
                className={`p-2 text-sm border rounded transition-colors ${
                  selectedColors.includes(color)
                    ? 'border-blue-500 bg-blue-100 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Geselecteerd: {selectedColors.join(', ') || 'Geen'}
          </div>
        </div>

        {/* Styles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ✨ Stijlen (Minimaal 1) *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {styles.map(style => (
              <button
                key={style}
                type="button"
                onClick={() => handleStyleToggle(style)}
                className={`p-2 text-sm border rounded transition-colors ${
                  selectedStyles.includes(style)
                    ? 'border-blue-500 bg-blue-100 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Geselecteerd: {selectedStyles.join(', ') || 'Geen'}
          </div>
        </div>

        {/* Custom Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 Specifieke Wensen (Optioneel maar aanbevolen voor precisie)
          </label>
          <Textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Bijvoorbeeld: 'Simpele ronde pot met rood deksel, minimalistisch design, geen tekst, witte achtergrond'"
            rows={3}
          />
          <div className="text-xs text-gray-500 mt-1">
            💡 Tip: Wees specifiek over vorm, materiaal, kleurplaatsing en stijl voor betere resultaten
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : isFormValid()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Genereren...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Genereer {imageCount} ontwerp{imageCount > 1 ? 'en' : ''}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
          
          {!isFormValid() && (
            <p className="text-sm text-red-600 mt-2 text-center">
              Vul alle verplichte velden in om te kunnen genereren
            </p>
          )}
        </div>
      </form>
    </div>
  );
}