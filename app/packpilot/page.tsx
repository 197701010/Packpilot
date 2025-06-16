'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function PackPilotPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen px-6 py-12 flex flex-col items-center justify-center text-center bg-white">
      <h1 className="text-4xl md:text-6xl font-bold text-ydr-red mb-6">
        De AI-toolkit voor verpakkingsdesign
      </h1>
      <p className="text-xl text-gray-700 max-w-2xl mb-8">
        Ontwerp sneller, slimmer en consistenter met AI. Moodboards, mockups en bewerking in één flow.
      </p>

      <div className="flex gap-4 mb-16">
        <Button className="bg-ydr-yellow text-black text-lg font-bold px-6 py-3" onClick={() => router.push('/onboarding')}>
          Probeer gratis
        </Button>
        <Button variant="outline" className="border-ydr-red text-ydr-red font-bold text-lg px-6 py-3">
          Inloggen / Registreren
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Feature letter="A" title="AI Concepten" description="Genereer creatieve verpakkingsideeën met slimme AI-inzichten." color="bg-ydr-yellow" />
        <Feature letter="M" title="Smart Mockups" description="Maak realistische mockups van je verpakking in seconden." color="bg-ydr-red" />
        <Feature letter="E" title="Live Editor" description="Pas designs aan met krachtige tools – zonder designskills." color="bg-black text-white" />
      </div>
    </main>
  )
}

function Feature({ letter, title, description, color }: { letter: string, title: string, description: string, color: string }) {
  return (
    <div className="border rounded-xl p-6">
      <div className={`w-10 h-10 flex items-center justify-center rounded-md mb-4 text-lg font-bold ${color}`}>
        {letter}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  )
}
