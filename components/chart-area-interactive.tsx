"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", online: 222, offline: 150 },
  { date: "2024-04-02", online: 97, offline: 180 },
  { date: "2024-04-03", online: 167, offline: 120 },
  { date: "2024-04-04", online: 242, offline: 260 },
  { date: "2024-04-05", online: 373, offline: 290 },
  { date: "2024-04-06", online: 301, offline: 340 },
  { date: "2024-04-07", online: 245, offline: 180 },
  { date: "2024-04-08", online: 409, offline: 320 },
  { date: "2024-04-09", online: 59, offline: 110 },
  { date: "2024-04-10", online: 261, offline: 190 },
  { date: "2024-04-11", online: 327, offline: 350 },
  { date: "2024-04-12", online: 292, offline: 210 },
  { date: "2024-04-13", online: 342, offline: 380 },
  { date: "2024-04-14", online: 137, offline: 220 },
  { date: "2024-04-15", online: 120, offline: 170 },
  { date: "2024-04-16", online: 138, offline: 190 },
  { date: "2024-04-17", online: 446, offline: 360 },
  { date: "2024-04-18", online: 364, offline: 410 },
  { date: "2024-04-19", online: 243, offline: 180 },
  { date: "2024-04-20", online: 89, offline: 150 },
  { date: "2024-04-21", online: 137, offline: 200 },
  { date: "2024-04-22", online: 224, offline: 170 },
  { date: "2024-04-23", online: 138, offline: 230 },
  { date: "2024-04-24", online: 387, offline: 290 },
  { date: "2024-04-25", online: 215, offline: 250 },
  { date: "2024-04-26", online: 75, offline: 130 },
  { date: "2024-04-27", online: 383, offline: 420 },
  { date: "2024-04-28", online: 122, offline: 180 },
  { date: "2024-04-29", online: 315, offline: 240 },
  { date: "2024-04-30", online: 454, offline: 380 },
  { date: "2024-05-01", online: 165, offline: 220 },
  { date: "2024-05-02", online: 293, offline: 310 },
  { date: "2024-05-03", online: 247, offline: 190 },
  { date: "2024-05-04", online: 385, offline: 420 },
  { date: "2024-05-05", online: 481, offline: 390 },
  { date: "2024-05-06", online: 498, offline: 520 },
  { date: "2024-05-07", online: 388, offline: 300 },
  { date: "2024-05-08", online: 149, offline: 210 },
  { date: "2024-05-09", online: 227, offline: 180 },
  { date: "2024-05-10", online: 293, offline: 330 },
  { date: "2024-05-11", online: 335, offline: 270 },
  { date: "2024-05-12", online: 197, offline: 240 },
  { date: "2024-05-13", online: 197, offline: 160 },
  { date: "2024-05-14", online: 448, offline: 490 },
  { date: "2024-05-15", online: 473, offline: 380 },
  { date: "2024-05-16", online: 338, offline: 400 },
  { date: "2024-05-17", online: 499, offline: 420 },
  { date: "2024-05-18", online: 315, offline: 350 },
  { date: "2024-05-19", online: 235, offline: 180 },
  { date: "2024-05-20", online: 177, offline: 230 },
  { date: "2024-05-21", online: 82, offline: 140 },
  { date: "2024-05-22", online: 81, offline: 120 },
  { date: "2024-05-23", online: 252, offline: 290 },
  { date: "2024-05-24", online: 294, offline: 220 },
  { date: "2024-05-25", online: 201, offline: 250 },
  { date: "2024-05-26", online: 213, offline: 170 },
  { date: "2024-05-27", online: 420, offline: 460 },
  { date: "2024-05-28", online: 233, offline: 190 },
  { date: "2024-05-29", online: 78, offline: 130 },
  { date: "2024-05-30", online: 340, offline: 280 },
  { date: "2024-05-31", online: 178, offline: 230 },
  { date: "2024-06-01", online: 178, offline: 200 },
  { date: "2024-06-02", online: 470, offline: 410 },
  { date: "2024-06-03", online: 103, offline: 160 },
  { date: "2024-06-04", online: 439, offline: 380 },
  { date: "2024-06-05", online: 88, offline: 140 },
  { date: "2024-06-06", online: 294, offline: 250 },
  { date: "2024-06-07", online: 323, offline: 370 },
  { date: "2024-06-08", online: 385, offline: 320 },
  { date: "2024-06-09", online: 438, offline: 480 },
  { date: "2024-06-10", online: 155, offline: 200 },
  { date: "2024-06-11", online: 92, offline: 150 },
  { date: "2024-06-12", online: 492, offline: 420 },
  { date: "2024-06-13", online: 81, offline: 130 },
  { date: "2024-06-14", online: 426, offline: 380 },
  { date: "2024-06-15", online: 307, offline: 350 },
  { date: "2024-06-16", online: 371, offline: 310 },
  { date: "2024-06-17", online: 475, offline: 520 },
  { date: "2024-06-18", online: 107, offline: 170 },
  { date: "2024-06-19", online: 341, offline: 290 },
  { date: "2024-06-20", online: 408, offline: 450 },
  { date: "2024-06-21", online: 169, offline: 210 },
  { date: "2024-06-22", online: 317, offline: 270 },
  { date: "2024-06-23", online: 480, offline: 530 },
  { date: "2024-06-24", online: 132, offline: 180 },
  { date: "2024-06-25", online: 141, offline: 190 },
  { date: "2024-06-26", online: 434, offline: 380 },
  { date: "2024-06-27", online: 448, offline: 490 },
  { date: "2024-06-28", online: 149, offline: 200 },
  { date: "2024-06-29", online: 103, offline: 160 },
  { date: "2024-06-30", online: 446, offline: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  online: {
    label: "Online",
    color: "var(--primary)",
  },
  offline: {
    label: "Offline",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function getDayYear(dateString: string) {
  const date = new Date(dateString);
  const day = date.toLocaleDateString(undefined, { weekday: 'short' });
  const year = date.getFullYear();
  return { day, year };
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-online)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-online)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOffline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-offline)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-offline)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                const { day, year } = getDayYear(value);
                return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} (${day}, ${year})`;
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    const { day, year } = getDayYear(value);
                    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} (${day}, ${year})`;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="online"
              type="natural"
              fill="url(#fillOnline)"
              stroke="var(--color-online)"
              stackId="a"
            />
            <Area
              dataKey="offline"
              type="natural"
              fill="url(#fillOffline)"
              stroke="var(--color-offline)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
