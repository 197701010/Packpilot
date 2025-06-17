'use client';

import { useState } from 'react';
import Link from 'next/link'; // Nieuwe import voor de links
import { Sparkles, Grid3x3, Upload } from 'lucide-react';

// Data voor onze navigatie-tabs
const TABS = {
  GENERATIONS: 'generations',
  COLLECTIONS: 'collections',
  UPLOAD: 'upload',
};

// De hoofdcomponent voor de Editor pagina
export default function EditorPage() {
  const [activeTab, setActiveTab] = useState(TABS.GENERATIONS);

  return (
    <main className="flex h-full bg-white">
      {/* Linker Navigatie Kolom */}
      <aside className="w-80 border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-dark">Edit</h1>
        <p className="text-gray-500 mt-1 mb-8">Pick an image to get started</p>
        
        <div className="space-y-2">
          <TabButton
            icon={Sparkles}
            label="Generations"
            isActive={activeTab === TABS.GENERATIONS}
            onClick={() => setActiveTab(TABS.GENERATIONS)}
          />
          <TabButton
            icon={Grid3x3}
            label="Collections"
            isActive={activeTab === TABS.COLLECTIONS}
            onClick={() => setActiveTab(TABS.COLLECTIONS)}
          />
          <TabButton
            icon={Upload}
            label="Upload"
            isActive={activeTab === TABS.UPLOAD}
            onClick={() => setActiveTab(TABS.UPLOAD)}
          />
        </div>
      </aside>

      {/* Rechter Content Kolom */}
      <section className="flex-1 p-8 bg-subtle">
        {activeTab === TABS.GENERATIONS && <GenerationsContent />}
        {activeTab === TABS.COLLECTIONS && <CollectionsContent />}
        {activeTab === TABS.UPLOAD && <UploadContent />}
      </section>
      
      {/* Sectie voor Recente Edits */}
      <aside className="w-80 border-l border-gray-200 p-6 bg-white">
        <RecentEditsPanel />
      </aside>
    </main>
  );
}

// Component voor de navigatieknoppen
function TabButton({ icon: Icon, label, isActive, onClick }) {
    const activeClasses = 'bg-red-50 border-brand-primary text-brand-primary';
    const inactiveClasses = 'border-transparent text-gray-600 hover:bg-gray-100';
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center p-4 rounded-lg border-2 font-semibold transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
        >
            <Icon className="w-6 h-6 mr-4" />
            {label}
        </button>
    );
}

// "Generations" content met klikbare kaarten
function GenerationsContent() {
  const generatedImages = [
    { id: 1, title: 'Aerosol can for michael', imageUrl: '/preview-1.jpg' },
    { id: 2, title: 'Advent calendar for cvbox', imageUrl: '/preview-2.jpg' },
    { id: 3, title: 'New product launch', imageUrl: '/preview-3.jpg' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a generation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {generatedImages.map((image) => (
          <Link 
            key={image.id} 
            href={`/editor/${image.id}`}
            className="group block rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white hover:border-brand-primary transition"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="h-32 w-full object-cover" 
            />
            <div className="p-2 text-sm font-semibold text-dark group-hover:text-brand-primary">
              {image.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Placeholder voor "Collections"
function CollectionsContent() {
  return <div className="flex items-center justify-center h-full text-gray-500">Collections komen hier.</div>
}

// Placeholder voor "Upload"
function UploadContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold">Upload an image</h3>
        <p>Drag and drop or click to select a file.</p>
    </div>
  )
}

// Component voor "Recent Edits"
function RecentEditsPanel() {
    const [filter, setFilter] = useState('in-progress');
    return (
        <div>
            <h2 className="text-lg font-semibold text-dark mb-4">Recent Edits</h2>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
                <button onClick={() => setFilter('in-progress')} className={`flex-1 py-1 px-2 rounded-md text-sm font-semibold ${filter === 'in-progress' ? 'bg-white shadow' : 'text-gray-600'}`}>In Progress</button>
                <button onClick={() => setFilter('completed')} className={`flex-1 py-1 px-2 rounded-md text-sm font-semibold ${filter === 'completed' ? 'bg-white shadow' : 'text-gray-600'}`}>Completed</button>
                <button onClick={() => setFilter('all')} className={`flex-1 py-1 px-2 rounded-md text-sm font-semibold ${filter === 'all' ? 'bg-white shadow' : 'text-gray-600'}`}>All</button>
            </div>
            <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center">
                    <div className="w-12 h-12 rounded-md bg-gray-300 mr-3"></div>
                    <div>
                        <div className="font-semibold text-sm text-dark">Image f43238fe</div>
                        <div className="text-xs text-gray-500">Started today at 7:47 PM</div>
                        <div className="mt-1 text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full inline-block">In progress</div>
                    </div>
                </div>
            </div>
        </div>
    )
}