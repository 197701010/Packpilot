"use client";

import React from 'react';

// We passen je bestaande component aan en maken hem robuuster.
// We gebruiken React.forwardRef, een standaardtechniek in React om de component
// flexibeler te maken voor de toekomst (bijv. voor formulieren en animaties).
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  
  // We combineren jouw basisstijlen met een aantal belangrijke toevoegingen
  // om te zorgen dat de input altijd zichtbaar en bruikbaar is.
  const baseStyles = 
    'flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm ' +
    'bg-white ' +                  // TOEGEVOEGD: Zorgt voor een expliciete witte achtergrond.
    'text-dark ' +                // TOEGEVOEGD: Zorgt dat de ingevoerde tekst donker is.
    'placeholder:text-gray-400 ' + // TOEGEVOEGD: Stijlt de placeholder tekst grijs.
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 ' + // TOEGEVOEGD: Een mooiere, rode focus-stijl.
    'disabled:cursor-not-allowed disabled:opacity-50';

  const combinedClassName = `${baseStyles} ${className || ''}`;

  return (
    <input
      type={type}
      className={combinedClassName}
      ref={ref}
      {...props}
    />
  );
});

// Dit helpt bij het debuggen in de React Developer Tools.
Input.displayName = 'Input';

// Omdat we in dit bestand maar één component hebben, is 'export default' de conventie.
export default Input;