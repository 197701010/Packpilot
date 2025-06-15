'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Bot, Wand, Scissors } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/mockup', label: 'Mockup', icon: FileText },
  { href: '/generator', label: 'Generator', icon: Wand },
  { href: '/editor', label: 'Editor', icon: Bot },
  { href: '/extractor', label: 'Extractor', icon: Scissors },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white text-gray-800 p-4">
      <div className="text-2xl font-bold mb-10">Yellowdress AI</div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}