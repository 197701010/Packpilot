'use client';

import Link from 'next/link';
import { Sparkles, Box, Pencil, Folder } from 'lucide-react';

// Data voor onze tool-kaarten
const tools = [
  {
    name: 'Generator',
    description: 'Genereer creatieve verpakkingsideeën op basis van je input.',
    href: '/generator',
    icon: Sparkles,
    iconColor: 'text-yellow-500',
  },
  {
    name: 'Mockup',
    description: 'Maak realistische mockups van je verpakking.',
    href: '/mockup',
    icon: Box,
    iconColor: 'text-red-500',
  },
  {
    name: 'Editor',
    description: 'Pas ontwerpen aan met krachtige tools zonder designskills.',
    href: '/editor',
    icon: Pencil,
    iconColor: 'text-pink-500',
  },
  {
    name: 'Collecties',
    description: 'Bekijk en organiseer je gegenereerde ontwerpen.',
    href: '/collections',
    icon: Folder,
    iconColor: 'text-blue-500',
  },
];

export default function DashboardPage() {
  return (
    <main className="flex-1 p-8 bg-subtle flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <h1 className="font-display text-4xl text-dark">Kies je volgende stap</h1>
          <p className="mt-2 text-lg text-gray-600">Wat wil je doen?</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group block p-8 bg-white rounded-xl border shadow-sm hover:shadow-lg hover:border-brand-primary transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-4`}>
                  <tool.icon className={`h-10 w-10 ${tool.iconColor}`} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-semibold text-dark">{tool.name}</h2>
                <p className="mt-2 text-gray-500">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}


