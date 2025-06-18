import { Inter, Playfair_Display } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'; // De globale CSS hoort hier

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
});

export const metadata = {
  title: 'Packpilot',
  description: 'AI-powered packaging design',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${playfair.variable} font-sans bg-subtle text-dark`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}