import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailResponse,
  GetOrderDetailsParams,
} from '../get-order-detail'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'Fulano',
      email: 'fulano@hotmail.com',
      phone: '123123123',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    totalInCents: 5000,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: {
          name: 'Pizza Peperone',
        },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        product: {
          name: 'Pizza Bacon',
        },
        quantity: 2,
      },
    ],
  })
})
