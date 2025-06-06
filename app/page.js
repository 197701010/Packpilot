// app/page.js - Layout met tekst onder de banner

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <main className="bg-white">
      
      {/* 1. Header Afbeelding */}
      <div className="w-full">
        <Image
          src="/ydr-banner.jpg" // Zorg dat dit de naam van jouw afbeelding is!
          alt="Yellow Dress Retail banner"
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* 2. Navigatiebalk */}
      <Navbar />

      {/* 3. Hero Sectie */}
     <section className="text-center max-w-4xl mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-32">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-yd-black mb-6">
          Creëer Unieke Verpakkingsdesigns met AI
        </h1>
        <p className="font-sans text-lg md:text-xl text-yd-black/80 mb-12 max-w-2xl mx-auto">
          Zet je ideeën binnen enkele minuten om in professionele verpakkingsontwerpen. Onze AI-gedreven tool helpt je bij het creëren van de perfecte uitstraling voor jouw product.
        </p>
        <Link href="/aanvraag">
          <span className="
            inline-block bg-yd-black text-white font-sans font-semibold text-lg 
            py-4 px-12 rounded-full transition-transform duration-300 ease-in-out
            hover:bg-yd-black/90 hover:scale-105 focus:outline-none 
            focus:ring-4 focus:ring-yd-yellow/50">
            Start AI-aanvraag
          </span>
        </Link>
      </section>

      {/* De secties 'Design as a Service' en 'Hoe werkt het?' zijn hier bewust weggelaten,
        omdat die nu als links in je navigatiebalk staan.
      */}
    </main>
  );
}