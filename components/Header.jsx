import React from 'react';
import Link from 'next/link'; // Zorg dat Link geïmporteerd is
import Button from './ui/Button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Design as a Service', href: '/design-as-a-service' },
  { name: 'Hoe werkt het', href: '/hoe-werkt-het' },
];

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-baseline space-x-2">
              <span className="font-extrabold text-lg uppercase tracking-wider text-brand-accent">Yellow Dress</span>
              <span className="text-sm font-semibold text-gray-500">Rethink Retail</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="font-semibold text-dark hover:text-brand-primary transition-colors">
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </nav>
            <div className="hidden md:block">
              {/* GECORRIGEERDE KNOP */}
              <Button asChild>
                <Link href="/aanvraag">START AI-AANVRAAG</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}