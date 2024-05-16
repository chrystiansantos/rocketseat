import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'pizza 1', amount: 5 },
    { product: 'pizza 2', amount: 2 },
    { product: 'pizza 3', amount: 4 },
    { product: 'pizza 4', amount: 9 },
    { product: 'pizza 5', amount: 1 },
  ])
})
