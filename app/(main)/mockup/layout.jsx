import { MockupProvider } from '@/context/MockupContext';

export default function MockupWizardLayout({ children }) {
  // Deze provider zorgt ervoor dat alle pagina's binnen de /mockup map
  // (dus de hoofdpagina, /select-packaging, en /configure)
  // toegang hebben tot dezelfde, gedeelde data in de 'rugzak'.
  return <MockupProvider>{children}</MockupProvider>;
}