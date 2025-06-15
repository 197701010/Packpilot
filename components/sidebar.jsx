"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiGrid, FiFeather, FiEdit, FiLayers, FiMoreHorizontal, FiPlusCircle, FiZap } from 'react-icons/fi';

const navItems = [
    { href: '/dashboard', icon: <FiGrid size={20} />, label: 'Dashboard' },
    { href: '/generator', icon: <FiZap size={20} />, label: 'Generator' },
    { href: '/mockup', icon: <FiFeather size={20} />, label: 'Mockup' },
    { href: '/editor', icon: <FiEdit size={20} />, label: 'Editor' },
    { href: '/extractor', icon: <FiLayers size={20} />, label: 'Extractor' },
    { href: '/more', icon: <FiMoreHorizontal size={20} />, label: 'More' },
];

const NavItem = ({ item }) => {
    const pathname = usePathname();
    const isActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);

    return (
        <Link href={item.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            {item.icon}
            <span className="font-semibold">{item.label}</span>
        </Link>
    );
};

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
            <div>
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold text-purple-700">Packpilot</h1>
                </div>
                <nav className="space-y-2">
                    {navItems.map(item => <NavItem key={item.label} item={item} />)}
                </nav>
            </div>
            <div className="space-y-2">
                <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100">
                    <FiPlusCircle size={20} />
                    <span className="font-semibold">More credits</span>
                </a>
                <div className="relative">
                    <div className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">1</div>
                </div>
            </div>
        </aside>
    );
}