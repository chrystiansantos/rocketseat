import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { HomeContainer, Product } from '../styles/pages/home'

import { Handbag } from '@phosphor-icons/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'

interface ProductType {
  id: string
  name: string
  imageUrl: string
  price: number
  priceFormat: string
  defaultPriceId: string
}

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    mode: 'free',
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
            className="keen-slider__slide"
          >
            <Image src={product.imageUrl} width={520} height={480} alt="" />
            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.priceFormat}</span>
              </div>
              <button>
                <Handbag size={32} weight="bold" />
              </button>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount as number) / 100,
      priceFormat: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount as number) / 100),
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
