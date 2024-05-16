import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useQuery } from 'react-query'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyReceiptInPeriod } from '@/api/daily-receipt-in-period'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { DateRangePicker } from '../ui/date-range-picker'
import { Label } from '../ui/label'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dallyRevenueInPeriod } = useQuery({
    queryFn: () =>
      getDailyReceiptInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
    queryKey: ['metrics', 'dally-revenue-in-period', dateRange],
  })

  const chartData = useMemo(() => {
    return dallyRevenueInPeriod?.map((chartItem) => {
      return {
        ...chartItem,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dallyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {dallyRevenueInPeriod ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart style={{ fontSize: 12 }} data={chartData}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-240 flex w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
