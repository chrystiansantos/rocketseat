import { http, HttpResponse } from 'msw'

import { GetDallyRevenueInPeriodResponse } from '../daily-receipt-in-period'

export const getDallyRevenueInPeriod = http.get<
  never,
  never,
  GetDallyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { day: '01/01/2024', receipt: 2000 },
    { day: '02/01/2024', receipt: 3000 },
    { day: '03/01/2024', receipt: 4000 },
    { day: '04/01/2024', receipt: 5000 },
    { day: '05/01/2024', receipt: 3000 },
    { day: '06/01/2024', receipt: 2000 },
  ])
})
