import { stripe } from '@/src/lib/stripe'
import { Product as ProductType, useCart } from '@/src/providers/cart'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/src/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceFormat: string
    description: string | null
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addProductInCar } = useCart()

  function handleAddProductInCart(product_: ProductType) {
    addProductInCar(product_)
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
          />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormat}</span>
          <p>{product.description}</p>
          <button onClick={() => handleAddProductInCart(product)}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [{ params: { id: 'prod_PkzYCNbRXnvxqg' } }],
  }
}

export const getStaticProps: GetStaticProps<
  ProductProps,
  { id: string }
> = async ({ params }) => {
  const productId = params?.id as string

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: (price.unit_amount as number) / 100,
        priceFormat: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format((price.unit_amount as number) / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    },
  }
}
