import { Inter } from 'next/font/google';
import { ReactNode } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
type LayoutProps = {
  children: ReactNode
}

const inter = Inter({ subsets: ['latin'] })

export function Layout({ children }: LayoutProps) {
  return (
    <div className={`${inter.className} relative flex min-h-screen flex-col bg-gray-700`}>
      <Header />
      <main className="flex-1 flex-col mb-12">
        {children}
      </main>
      <Footer />
    </div>
  )

}