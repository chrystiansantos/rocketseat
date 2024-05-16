import { api } from '@/lib/api'

export interface DeliveryOrderParams {
  orderId: string
}

export async function deliveryOrder({ orderId }: DeliveryOrderParams) {
  await api.patch(`orders/${orderId}/deliver`)
}
