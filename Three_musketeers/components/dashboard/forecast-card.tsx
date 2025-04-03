import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

interface ForecastCardProps {
  className?: string
}

export function ForecastCard({ className }: ForecastCardProps) {
  const data = [
    { name: "May", savings: 1000 },
    { name: "Jun", savings: 1500 },
    { name: "Jul", savings: 2100 },
    { name: "Aug", savings: 2800 },
    { name: "Sep", savings: 3600 },
    { name: "Oct", savings: 4500 },
  ]

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Savings Forecast</CardTitle>
        <CardDescription>Projected savings for the next 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltip>
                          <ChartTooltipContent
                            content={
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-sm text-muted-foreground">
                                    {payload[0]?.payload?.name || ""}
                                  </span>
                                  <span className="font-bold">${payload[0]?.value || 0}</span>
                                </div>
                              </div>
                            }
                          />
                        </ChartTooltip>
                      )
                    }
                    return null
                  }}
                />
                <Line type="monotone" dataKey="savings" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

