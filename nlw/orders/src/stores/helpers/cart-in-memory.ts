import { ProductProps } from '@/utils/data/products'

import { ProductCartProps } from '../cart-store'

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => id === newProduct.id)
  if (existingProduct) {
    return products.map((product) =>
      product.id === newProduct.id
        ? { ...product, quantity: ++product.quantity }
        : product,
    )
  }

  return [...products, { ...newProduct, quantity: 1 }]
}

export function remove(products: ProductCartProps[], productRemoveId: string) {
  const updatedProducts = products.map((product) =>
    product.id === productRemoveId
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product,
  )

  return updatedProducts.filter((product) => product.quantity > 0)
}
