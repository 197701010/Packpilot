import './globals.css';

export const metadata = {
  title: 'Packpilot | AI Verpakkingsdesign',
  description: 'Creëer unieke verpakkingsdesigns met AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}