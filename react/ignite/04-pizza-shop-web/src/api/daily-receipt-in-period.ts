import { api } from '@/lib/api'

interface GetDallyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDallyRevenueInPeriodResponse = {
  day: string
  receipt: number
}[]

export async function getDailyReceiptInPeriod({
  from,
  to,
}: GetDallyRevenueInPeriodQuery) {
  const { data } = await api.get<GetDallyRevenueInPeriodResponse>(
    'metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )
  return data
}
