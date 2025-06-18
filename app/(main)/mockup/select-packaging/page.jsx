'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMockupContext } from '@/context/MockupContext'; // Gebruik onze context
import Button from '@/components/ui/Button';
import { ArrowLeft, Check } from 'lucide-react';

const mockupTypes = [
    { id: 'coffee-cup', name: 'Koffiebeker', img: 'https://placehold.co/400x400/F3F4F6/333?text=Beker' },
    { id: 'shipping-box', name: 'Verzenddoos', img: 'https://placehold.co/400x400/F3F4F6/333?text=Doos' },
    { id: 'soda-can', name: 'Drankblikje', img: 'https://placehold.co/400x400/F3F4F6/333?text=Blikje' },
];

export default function SelectPackagingPage() {
    const router = useRouter();
    const { formData, updateFormData } = useMockupContext();

    const toggleProductSelection = (productId) => {
        const currentSelection = formData.selectedProducts || [];
        const newSelection = currentSelection.includes(productId) ? currentSelection.filter(id => id !== productId) : [...currentSelection, productId];
        updateFormData('selectedProducts', newSelection);
    };

    return (
        <main className="p-4 sm:p-8 bg-white min-h-full">
            <header className="max-w-6xl mx-auto mb-8">
                <p className="text-sm font-bold uppercase text-gray-500">Stap 2 van 3</p>
                <div className="flex justify-between items-center mt-2">
                    <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4"/>Terug</Button>
                    <Button onClick={() => router.push('/mockup/configure')} disabled={(formData.selectedProducts || []).length === 0}>Next</Button>
                </div>
            </header>
            <div className="text-center">
                <h1 className="font-display text-4xl text-dark mt-2 mb-8">Select packaging products</h1>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 max-w-6xl mx-auto">
                    {mockupTypes.map(mockup => {
                        const isSelected = (formData.selectedProducts || []).includes(mockup.id);
                        return (
                            <div key={mockup.id} onClick={() => toggleProductSelection(mockup.id)} className={`relative rounded-lg cursor-pointer border-2 transition-all overflow-hidden ${isSelected ? 'border-brand-primary ring-2 ring-brand-primary' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
                                {isSelected && (<div className="absolute top-2 right-2 z-10 bg-brand-primary text-white rounded-full p-1"><Check size={16} /></div>)}
                                <img src={mockup.img} alt={mockup.name} className="h-48 w-full object-cover bg-gray-100" />
                                <p className="font-semibold text-dark p-3 bg-white">{mockup.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}