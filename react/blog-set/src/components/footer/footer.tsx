import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:flex-row gap-8 py-8">
          <Link href="/">
            <Image
              src="/Brand-Logo.svg"
              alt=""
              width={116}
              height={32}
            />
          </Link>

          <nav className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <Link href="/termos-uso" className="hover:text-primary">Termos de uso</Link>
            <Link href="/politica-privacidade" className="hover:text-primary">Política de privacidade</Link>
            <Link href="/feedback" className="hover:text-primary">Feedback</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}