'use client';

import React, { createContext, useContext, useState } from 'react';

// Maak een nieuwe, lege Context aan.
const MockupContext = createContext(null);

// Maak de 'Provider'. Dit is de component die de data daadwerkelijk beheert.
// Hij zal alle stappen van onze wizard omvatten.
export function MockupProvider({ children }) {
    const [formData, setFormData] = useState({
        artworkFiles: [],
        selectedProducts: [],
        imageCount: 4, // Standaardwaarde
    });

    // Een simpele functie om de data bij te werken.
    const updateFormData = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    // We geven de data en de update-functie door aan alle 'kinderen'.
    const value = { formData, updateFormData };

    return (
        <MockupContext.Provider value={value}>
            {children}
        </MockupContext.Provider>
    );
}

// Maak een 'custom hook'. Dit is een handige afkorting voor de andere
// componenten om de data uit de context te kunnen lezen en aanpassen.
export function useMockupContext() {
    const context = useContext(MockupContext);
    if (!context) {
        throw new Error('useMockupContext moet binnen een MockupProvider gebruikt worden.');
    }
    return context;
}