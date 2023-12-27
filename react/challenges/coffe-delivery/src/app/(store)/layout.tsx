import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from '../components/cart-button'
import { CityButton } from '../components/city-button'
import LoadingNotificationProvider from '../context/LoadingNotification'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LoadingNotificationProvider>
      <header className="flex items-center justify-between py-8 mx-auto max-w-[1120px] sm:px-6">
        <Link href="/">
          <Image src="/logo.svg" alt="" width={84} height={40} />
        </Link>

        <div className="flex items-center gap-3">
          <CityButton />
          <CartButton />
        </div>
      </header>
      {children}
    </LoadingNotificationProvider>
  )
}
