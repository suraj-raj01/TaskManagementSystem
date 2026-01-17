"use client"

import { Activity, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../components/ui/chart"

export const description = "A step area chart"

const chartData = [
  { month: "January", desktop: 60, mobile: 20 },
  { month: "February", desktop: 70, mobile: 38 },
  { month: "March", desktop: 40, mobile: 30 },
  { month: "April", desktop: 55, mobile: 50 },
  { month: "May", desktop: 30, mobile: 30 },
  { month: "June", desktop: 40, mobile: 35 },
  { month: "July", desktop: 50, mobile: 10 },
  { month: "August", desktop: 45, mobile: 15 },
  { month: "September", desktop: 70, mobile: 35 },
  { month: "October", desktop: 35, mobile: 15 },
  { month: "November", desktop: 50, mobile: 25 },
  { month: "December", desktop: 62, mobile: 26 },
]

const chartConfig = {
  desktop: {
    label: "Completed Tasks : ",
    color: "var(--chart-1)",
    icon: Activity,
  },
    mobile: {
    label: "Pending Tasks : ",
    color: "var(--chart-2)",
    icon: TrendingUp,
  },
} satisfies ChartConfig

export function ChartAreaStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Status</CardTitle>
        <CardDescription>
          January - Dec 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="step"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
            <Area
              dataKey="mobile"
              type="step"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
