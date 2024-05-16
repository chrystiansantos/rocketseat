import { Helmet } from 'react-helmet-async'

import { DayOrdersAmountCard } from '@/components/dashboards/day-orders-amount-card'
import { MonthCanceledOrdersAmount } from '@/components/dashboards/month-canceled-orders-amount-card'
import MonthOrdersAmountCard from '@/components/dashboards/month-orders-amount-card'
import { MonthRevenueCard } from '@/components/dashboards/month-revenue-card'
import { PopularProductsChart } from '@/components/dashboards/popular-products-chart'
import { RevenueChart } from '@/components/dashboards/revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmount />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
