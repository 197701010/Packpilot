// components/Navbar.jsx - Definitieve versie met volledige breedte

import Link from 'next/link';
import Image from 'next/image';

const logoPath = '/logo-ydretail.svg'; 

export default function Navbar() {
  return (
    <header className="bg-white w-full">
      {/* De 'max-w-7xl' en 'mx-auto' zijn hieronder verwijderd */}
      <nav className="flex items-center justify-between px-6 py-4">
        
        <div className="flex-shrink-0">
          <Link href="/" className="flex flex-col items-center">
            <Image 
              src={logoPath} 
              alt="Yellow Dress Logo" 
              width={80} 
              height={80} 
              className="h-16 w-auto md:h-20"
            />
            <span className="font-sans text-base font-black tracking-widest text-yd-black mt-2">
              RETHINK RETAIL
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-8 md:gap-10">
          <Link href="/" className="font-sans text-lg font-black uppercase tracking-widest text-yd-red transition-colors duration-300">
            Home
          </Link>
          
          <Link href="/design-as-a-service" className="font-sans text-lg font-black uppercase tracking-widest text-yd-black hover:text-yd-red transition-colors duration-300">
            Design as a Service
          </Link>
          <Link href="/hoe-werkt-het" className="font-sans text-lg font-black uppercase tracking-widest text-yd-black hover:text-yd-red transition-colors duration-300">
            Hoe werkt het
          </Link>

          <Link href="/aanvraag" className="
            font-sans text-lg font-bold uppercase tracking-widest text-white 
            bg-yd-red hover:bg-opacity-90 
            px-8 py-4 rounded-md transition
            shadow-lg hover:shadow-xl">
            Start AI-aanvraag
          </Link>
        </div>

      </nav>
    </header>
  );
}