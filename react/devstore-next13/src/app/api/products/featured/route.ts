import data from '../data.json'

export async function GET() {
  const featuredProducts = data.products.filter((product) => product.featured)

  await new Promise((resolve) => setTimeout(() => resolve(''), 5000))

  return Response.json(featuredProducts)
}
