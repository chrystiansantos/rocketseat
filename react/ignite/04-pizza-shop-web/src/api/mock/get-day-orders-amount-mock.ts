import { http, HttpResponse } from 'msw'

import { GetDayOrdersAmountResponse } from '../get-day-orders-amount'

export const getDayOrderAmountMock = http.get<
  never,
  never,
  GetDayOrdersAmountResponse
>('/metrics/day-orders-amount', () => {
  return HttpResponse.json({
    amount: 200,
    diffFromYesterday: -5,
  })
})
