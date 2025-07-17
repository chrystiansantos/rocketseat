import { Layout } from "@/components/layout";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Site.Set',
  description: 'Venda seus producos como afiliado em um único lugar',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
