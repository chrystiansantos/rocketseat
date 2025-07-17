import { LandingPage } from "@/templates/landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Site.Set',
  description: 'Venda seus produtos como afiliado em um único lugar',
  robots: 'index, follow',
  openGraph: {
    title: 'Site.Set',
    description: 'Venda seus producos como afiliado em um único lugar',
    // url: '' // must have production control,
    siteName: 'Site.Set',
    locale: 'pt_BR',
    type: 'website',
    images: [{
      url: '', // must have production control,
      width: 800,
      height: 600,
      alt: 'Site.Set'
    }]
  }
}

export default function Home() {
  return (
    <LandingPage />
  );
}