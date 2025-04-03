"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SavingsProjection() {
  const projectionData = [
    {
      month: "May 2025",
      savings: 4500,
      projected: 4500,
      income: 4350,
      expenses: 3250,
    },
    {
      month: "Jun 2025",
      savings: 5600,
      projected: 5600,
      income: 4350,
      expenses: 3250,
    },
    {
      month: "Jul 2025",
      savings: null,
      projected: 6700,
      income: 4350,
      expenses: 3250,
    },
    {
      month: "Aug 2025",
      savings: null,
      projected: 7800,
      income: 4350,
      expenses: 3250,
    },
    {
      month: "Sep 2025",
      savings: null,
      projected: 8900,
      income: 4350,
      expenses: 3250,
    },
    {
      month: "Oct 2025",
      savings: null,
      projected: 10000,
      income: 4350,
      expenses: 3250,
    },
  ]

  const insights = [
    {
      title: "Projected Savings",
      value: "$10,000",
      description: "by October 2025",
      badge: "6 months",
    },
    {
      title: "Monthly Savings Rate",
      value: "$1,100",
      description: "average per month",
      badge: "25.3%",
    },
    {
      title: "Total Growth",
      value: "122%",
      description: "from current savings",
      badge: "+$5,500",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="h-[350px]">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltip>
                        <ChartTooltipContent
                          content={
                            <div className="flex flex-col gap-2">
                              <div className="text-sm font-medium">{payload[0]?.payload?.month || ""}</div>
                              {payload.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between gap-2">
                                  <span className="text-sm text-muted-foreground capitalize">{entry?.name || ""}</span>
                                  <span className="font-bold">${entry?.value || 0}</span>
                                </div>
                              ))}
                            </div>
                          }
                        />
                      </ChartTooltip>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="projected"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{insight.value}</div>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
                <Badge variant="outline">{insight.badge}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

