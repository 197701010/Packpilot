'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sparkles, Box, Pencil, Layers, Camera, MoreHorizontal, PlusCircle } from 'lucide-react';

const mainNavItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Generator', icon: Sparkles, href: '/generator', submenu: [{ name: 'Launch generator', href: '/generator', icon: Sparkles }, { name: 'View all generations', href: '/generator/generations', icon: Layers }] },
  { name: 'Mockup', icon: Box, href: '/mockup', submenu: [{ name: 'Launch mockup', href: '/mockup', icon: Box }, { name: 'View all mockups', href: '/mockup/mockups', icon: Layers }] },
  { name: 'Editor', icon: Pencil, href: '/editor' },
  { name: 'Extractor', icon: Layers, href: '/extractor', submenu: [{ name: 'Launch extractor', href: '/extractor', icon: Layers }, { name: 'View all extractions', href: '/extractor/extractions', icon: Layers }, { name: 'Start from upload', href: '/extractor/upload', icon: PlusCircle }] },
  { name: 'Renders', icon: Camera, href: '/renders' },
];

export default function Sidebar() {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const pathname = usePathname();

  const handleMouseEnter = (itemName) => setOpenSubmenu(itemName);
  const handleMouseLeave = () => setOpenSubmenu(null);

  const activeSubmenu = mainNavItems.find(item => item.name === openSubmenu)?.submenu;

  return (
    <div className="flex h-screen" onMouseLeave={handleMouseLeave}>
      <div className="flex h-full flex-col items-center space-y-2 bg-white p-2 border-r border-gray-200 z-20">
        {mainNavItems.map((item) => {
          const isActive = pathname === '/' ? item.href === '/' : pathname.startsWith(item.href);
          return (
            <Link href={item.href} key={item.name}>
              <div onMouseEnter={() => handleMouseEnter(item.name)} className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${isActive ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <item.icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
        <div className="flex-grow"></div>
        <div className="p-3 text-gray-600 cursor-pointer"><MoreHorizontal className="w-6 h-6" /></div>
        <div className="p-3 text-gray-600 cursor-pointer"><PlusCircle className="w-6 h-6" /></div>
      </div>
      {activeSubmenu && (
        <div className="w-64 bg-white p-4 border-r border-gray-200 z-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            {React.createElement(mainNavItems.find(item => item.name === openSubmenu).icon, { className: 'w-6 h-6 mr-3' })}
            {openSubmenu}
          </h2>
          <nav className="flex flex-col space-y-2">
            {activeSubmenu.map((subItem) => (
              <Link key={subItem.name} href={subItem.href} className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                {subItem.icon && <subItem.icon className="w-5 h-5 mr-3" />}
                {subItem.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}