import { stripe } from '@/src/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const { purchasedProducts } = req.body

  if (!purchasedProducts.length)
    return res.status(400).json({ error: 'Price not found' })

  const successUrl = `${process.env.NEXT_URL}/success/?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: purchasedProducts,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
