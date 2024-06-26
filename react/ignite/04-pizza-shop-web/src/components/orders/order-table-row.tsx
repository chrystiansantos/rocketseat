import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliveryOrder } from '@/api/delivery-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { Dialog, DialogTrigger } from '../ui/dialog'
import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderFn, isLoading: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isLoading: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: deliverOrderFn, isLoading: isDeliveringOrder } =
    useMutation({
      mutationFn: deliveryOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  const { mutateAsync: dispatchOrderFn, isLoading: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })
    ordersListCache.forEach(([queryKey, cacheData]) => {
      if (!cacheData) return
      queryClient.setQueryData<GetOrdersResponse>(queryKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <TableCell>
          {order.status === 'pending' && (
            <Button
              onClick={() => approveOrderFn({ orderId: order.orderId })}
              disabled={isApprovingOrder}
              variant="ghost"
              size="xs"
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Aprovar
            </Button>
          )}

          {order.status === 'processing' && (
            <Button
              onClick={() => dispatchOrderFn({ orderId: order.orderId })}
              disabled={isDispatchingOrder}
              variant="ghost"
              size="xs"
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Em entrega
            </Button>
          )}

          {order.status === 'delivering' && (
            <Button
              onClick={() => deliverOrderFn({ orderId: order.orderId })}
              disabled={isDeliveringOrder}
              variant="ghost"
              size="xs"
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Entregue
            </Button>
          )}
        </TableCell>
      </TableCell>
      <TableCell>
        <TableCell>
          <Button
            variant="ghost"
            size="xs"
            disabled={
              !['pending', 'processing'].includes(order.status) ||
              isCancelingOrder
            }
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
          >
            <X className="mr-2 h-3 w-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableCell>
    </TableRow>
  )
}
