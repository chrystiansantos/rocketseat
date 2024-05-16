import logoImg from '@/src/assets/logo.svg'
import { Handbag } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '../providers/cart'
import {
  ButtonCart,
  Header as HeaderStyle,
  QuantityInCart,
} from '../styles/pages/app'

export function Header() {
  const { changeSidebarStatus, productsInCart } = useCart()
  const { asPath } = useRouter()
  const showButtonCart = !asPath.includes('/success')

  return (
    <HeaderStyle>
      <Link href="/">
        <Image src={logoImg} width={130} height={52} alt="" />
      </Link>
      {showButtonCart && (
        <ButtonCart onClick={changeSidebarStatus}>
          <Handbag size={24} weight="bold" />
          <QuantityInCart>{productsInCart.length}</QuantityInCart>
        </ButtonCart>
      )}
    </HeaderStyle>
  )
}
