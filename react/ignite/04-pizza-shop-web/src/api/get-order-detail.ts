import { api } from '@/lib/api'

export interface GetOrderDetailsParams {
  orderId: string
}

export interface GetOrderDetailResponse {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const { data } = await api.get<GetOrderDetailResponse>(`/orders/${orderId}`)
  return data
}
