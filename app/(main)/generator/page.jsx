'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';

// --- Data (de volledige lijsten) ---
const packagingTypes = [
    { name: "Adventskalender", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" }, { name: "Spuitbus", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" },
    { name: "Pompflacon", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" }, { name: "Reep-folie", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" },
    { name: "Bierfles", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" }, { name: "Koekblik", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" },
    { name: "Bordeaux Wijnfles", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" }, { name: "Doos met Venster", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" },
    { name: "Taartdoos", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" }, { name: "Kartonnen Doos", img: "https://placehold.co/400x400/F3F4F6/F3F4F6" },
];
const colorOptions = [
    { name: "Plum", hex: "#8E4585" }, { name: "Wisteria Purple", hex: "#C9A0DC" }, { name: "Heliotrope", hex: "#DF73FF" },
    { name: "Lavender", hex: "#E6E6FA" }, { name: "Lilac", hex: "#C8A2C8" }, { name: "Periwinkle", hex: "#CCCCFF" },
];
const styles = [
    { name: "Minimalistic", desc: "Simplicity and clarity.", img: "https://picsum.photos/seed/minimalistic/400/400" },
    { name: "Modern", desc: "Clean lines and a neutral color palette.", img: "https://picsum.photos/seed/modern/400/400" },
    { name: "Bold", desc: "A focus on bold typography and patterns.", img: "https://picsum.photos/seed/bold/400/400" },
    { name: "Vintage", desc: "Nostalgic typography, colors and patterns.", img: "https://picsum.photos/seed/vintage/400/400" },
];

// --- Hoofd Pagina Component ---
export default function GeneratorWizardPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        packagingType: '', companyName: '', slogan: '', logoFile: null, colors: [],
        prompt: '', packagingLook: '', styles: [], imageCount: 1, variations: [],
    });

    const handleNextStep = () => setStep(prev => prev < 4 ? prev + 1 : prev);
    const handlePrevStep = () => setStep(prev => prev > 1 ? prev - 1 : prev);
    const updateFormData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/generator/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.detail || "Fout bij starten van generatie.");
            }
            const prediction = await response.json();
            router.push(`/generator/resultaat/${prediction.id}`);
        } catch (error) {
            console.error("Fout bij submitten:", error);
            alert(error.message);
            setIsLoading(false);
        }
    };

    const STEPS = [
        { number: 1, title: "YOUR DESIGN", component: <Step1_PackagingType onUpdate={updateFormData} onNext={handleNextStep} currentValue={formData.packagingType} /> },
        { number: 2, title: "YOUR BRAND", component: <Step2_Branding onUpdate={updateFormData} onNext={handleNextStep} onBack={handlePrevStep} formData={formData} /> },
        { number: 3, title: "YOUR DESIGN", component: <Step3_Describe onUpdate={updateFormData} onNext={handleNextStep} onBack={handlePrevStep} formData={formData} /> },
        { number: 4, title: "CONFIGURATION", component: <Step4_Configure onUpdate={updateFormData} onSubmit={handleSubmit} onBack={handlePrevStep} formData={formData} isLoading={isLoading} /> }
    ];
    const currentStepData = STEPS.find(s => s.number === step);

    return (
        <div className="p-4 sm:p-8 bg-white min-h-full">
            {currentStepData && (
                <>
                    <header className="max-w-5xl mx-auto mb-8">
                        <p className="text-sm font-bold uppercase text-gray-500">{currentStepData.title}</p>
                        <div className="flex justify-between items-center mt-2">
                            {step > 1 ? <Button variant="outline" onClick={handlePrevStep} disabled={isLoading}><ArrowLeft className="mr-2 h-4 w-4"/>Back</Button> : <div></div>}
                            {step < 4 && <Button onClick={handleNextStep}>Next</Button>}
                            {step === 4 && <Button onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Genereren...</>) : ('Generate')}
                            </Button>}
                        </div>
                    </header>
                    <main>
                        {currentStepData.component}
                    </main>
                </>
            )}
        </div>
    );
}

// --- Componenten voor elke Stap ---

function Step1_PackagingType({ onUpdate, onNext, currentValue }) {
    return (
        <div className="text-center max-w-6xl mx-auto">
            <h1 className="font-display text-4xl text-dark mt-2 mb-8">Kies je verpakking</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {packagingTypes.map(type => (
                    <div key={type.name} onClick={() => onUpdate('packagingType', type.name)} className={`rounded-lg cursor-pointer border-2 transition-all overflow-hidden ${currentValue === type.name ? 'border-brand-primary ring-2 ring-brand-primary' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                        <img src={type.img} alt={type.name} className="h-40 w-full object-cover bg-gray-100" />
                        <p className="font-semibold text-dark p-3 bg-white">{type.name}</p>
                    </div>
                ))}
            </div>
            <Button onClick={onNext} disabled={!currentValue} size="lg">Volgende</Button>
        </div>
    );
}

function Step2_Branding({ onUpdate, onNext, onBack, formData }) {
    const toggleColor = (colorName) => {
        const currentColors = formData.colors || [];
        const newColors = currentColors.includes(colorName) ? currentColors.filter(c => c !== colorName) : [...currentColors, colorName];
        if (newColors.length > 4) { alert("Maximaal 4 kleuren."); return; }
        onUpdate('colors', newColors);
    };
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl text-center text-dark mb-8">Add your branding</h1>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="font-semibold text-sm mb-2 block">Company</label><Input type="text" value={formData.companyName || ''} onChange={(e) => onUpdate('companyName', e.target.value)} /></div>
                    <div><label className="font-semibold text-sm mb-2 block">Slogan</label><Input type="text" value={formData.slogan || ''} onChange={(e) => onUpdate('slogan', e.target.value)} /></div>
                </div>
                <div><label className="font-semibold text-sm mb-2 block">Logo (optional)</label><Input type="file" onChange={(e) => onUpdate('logoFile', e.target.files[0])} /></div>
                <div>
                    <label className="font-semibold text-sm mb-2 block">Choose up to 4 colours (optional)</label>
                    <div className="h-48 grid grid-cols-6 sm:grid-cols-9 gap-2 mt-2 overflow-y-auto p-2 border rounded-lg">
                        {colorOptions.map(color => (<div key={color.name} onClick={() => toggleColor(color.name)} className="relative h-12 rounded-lg cursor-pointer flex items-center justify-center border-2" style={{ backgroundColor: color.hex }}>{(formData.colors || []).includes(color.name) && (<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg ring-2 ring-offset-2 ring-brand-primary"><Check className="text-white" /></div>)}</div>))}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-8"><Button onClick={onBack} variant="outline"><ArrowLeft className="mr-2 h-4 w-4"/>Terug</Button><Button onClick={onNext}>Volgende</Button></div>
        </div>
    );
}

function Step3_Describe({ onUpdate, onNext, onBack, formData }) {
    const toggleStyle = (styleName) => {
        const currentStyles = formData.styles || [];
        const newStyles = currentStyles.includes(styleName) ? currentStyles.filter(s => s !== styleName) : [...currentStyles, styleName];
        onUpdate('styles', newStyles);
    };
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="font-display text-4xl text-center text-dark mb-8">Describe your design</h1>
            <div><label className="font-semibold text-sm mb-2 block">How should your packaging look? <span className="text-gray-500 font-normal">optional</span></label><Textarea value={formData.prompt || ''} onChange={(e) => onUpdate('prompt', e.target.value)} rows={3} placeholder="e.g. Create a sleek matte box with pastel pinks, a foil finishes, and bold clear text that delights every unboxing" /></div>
            <div className="mt-8">
                <label className="font-semibold text-sm mb-2 block">Choose up to 5 styles <span className="text-gray-500 font-normal">optional</span></label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {styles.map(style => (<div key={style.name} onClick={() => toggleStyle(style.name)} className={`rounded-lg border-2 bg-white overflow-hidden cursor-pointer transition-all ${ (formData.styles || []).includes(style.name) ? 'border-brand-primary ring-2 ring-brand-primary' : 'border-gray-200'}`}><img src={style.img} alt={style.name} className="h-32 w-full object-cover" /><div className="p-4"><h3 className="font-semibold">{style.name}</h3><p className="text-sm text-gray-500">{style.desc}</p></div></div>))}
                </div>
            </div>
            <div className="flex justify-between items-center mt-8"><Button onClick={onBack} variant="outline"><ArrowLeft className="mr-2 h-4 w-4"/>Terug</Button><Button onClick={onNext}>Volgende</Button></div>
        </div>
    );
}

function Step4_Configure({ onUpdate, onSubmit, onBack, formData, isLoading }) {
    const toggleVariation = (variation) => {
        const currentVariations = formData.variations || [];
        const newVariations = currentVariations.includes(variation) ? currentVariations.filter(v => v !== variation) : [...currentVariations, variation];
        onUpdate('variations', newVariations);
    };
    return (
        <div className="max-w-5xl mx-auto">
             <h1 className="font-display text-4xl text-center text-dark mb-8">Final step</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="font-semibold text-sm mb-2 block">Choose how many images to generate</label>
                    <p className="text-xs text-gray-500">1 credit per image</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (<button key={num} onClick={() => onUpdate('imageCount', num)} className={`p-4 rounded-lg font-semibold border-2 text-lg ${formData.imageCount === num ? 'border-brand-primary bg-red-50' : 'bg-gray-100 border-transparent'}`}>{num}</button>))}
                    </div>
                </div>
                 <div>
                    <label className="font-semibold text-sm mb-2 block">Creative variations</label>
                    <p className="text-xs text-gray-500">Adds additional designs that re-interpret your prompt</p>
                    <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div><h4 className="font-semibold">Luxury</h4><p className="text-sm text-gray-500">Adds premium and sophisticated high-quality aesthetics</p></div>
                            <input type="checkbox" onChange={() => toggleVariation('luxury')} checked={(formData.variations || []).includes('luxury')} className="h-5 w-5 rounded text-brand-primary focus:ring-brand-primary" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                             <div><h4 className="font-semibold">Creative</h4><p className="text-sm text-gray-500">Experimental, avant-garde and artistic interpretations</p></div>
                             <input type="checkbox" onChange={() => toggleVariation('creative')} checked={(formData.variations || []).includes('creative')} className="h-5 w-5 rounded text-brand-primary focus:ring-brand-primary" />
                        </div>
                    </div>
                </div>
            </div>
             <div className="flex justify-between items-center mt-8"><Button onClick={onBack} variant="outline" disabled={isLoading}><ArrowLeft className="mr-2 h-4 w-4"/>Terug</Button><Button onClick={onSubmit} disabled={isLoading}>{isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Genereren...</>) : ('Generate')}</Button></div>
        </div>
    );
}