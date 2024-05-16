import { api } from '@/lib/api'

export interface DeleteOrderParams {
  orderId: string
}

export async function cancelOrder({ orderId }: DeleteOrderParams) {
  await api.patch(`orders/${orderId}/cancel`)
}
