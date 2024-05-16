import { X } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { useCart } from '../providers/cart'
import {
  Cart,
  CartItem,
  CartProducts,
  CartSummary,
  CloseSidebar,
  Container,
  ContainerImage,
  Sidebar as SidebarStyle,
} from '../styles/pages/sidebar'
export function Sidebar() {
  const {
    openSidebar,
    changeSidebarStatus,
    productsInCart,
    handleBuyProduct,
    removeProductInCart,
  } = useCart()

  const { totalCart, quantityItemsInCar } = productsInCart.reduce(
    (acc, item) => {
      return {
        totalCart: acc.totalCart + item.price * (item.quantity ?? 0),
        quantityItemsInCar: acc.quantityItemsInCar + (item.quantity ?? 0),
      }
    },
    {
      quantityItemsInCar: 0,
      totalCart: 0,
    },
  )

  const handleCloseSidebar = () => {
    if (openSidebar === 'open') {
      changeSidebarStatus()
    }
  }

  return (
    <>
      <Container className={openSidebar} onClick={handleCloseSidebar} />

      <SidebarStyle className={openSidebar}>
        <CloseSidebar onClick={changeSidebarStatus}>
          <button>
            <X size={24} weight="bold" />
          </button>
        </CloseSidebar>

        <Cart>
          <header>Sacola de compras</header>
          <CartProducts>
            {productsInCart.length ? (
              productsInCart.map((product) => (
                <CartItem key={product.id}>
                  <ContainerImage>
                    <Image
                      src={product.imageUrl}
                      width={94}
                      height={94}
                      alt=""
                    />
                  </ContainerImage>
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      <span>{product.quantity}x</span>
                      {product.priceFormat}
                    </span>
                    <button onClick={() => removeProductInCart(product.id)}>
                      Remover
                    </button>
                  </div>
                </CartItem>
              ))
            ) : (
              <h2>
                Você ainda não selecionou nenhum produto, vamos escolher o
                primeiro !
              </h2>
            )}
          </CartProducts>
          <CartSummary>
            <div>
              <span>Quantidade</span>
              <strong>{quantityItemsInCar} itens</strong>
            </div>
            <div>
              <span>Valor Total</span>
              <strong>
                {new Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalCart)}
              </strong>
            </div>
            <button onClick={handleBuyProduct}>Finalizar compra</button>
          </CartSummary>
        </Cart>
      </SidebarStyle>
    </>
  )
}
