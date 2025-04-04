"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LightbulbIcon } from "lucide-react"

export function SpendingPatternAnalysis() {
  const data = [
    { name: "Food", value: 450, color: "#10b981" },
    { name: "Transport", value: 180, color: "#3b82f6" },
    { name: "Entertainment", value: 120, color: "#8b5cf6" },
    { name: "Shopping", value: 350, color: "#f43f5e" },
    { name: "Utilities", value: 180, color: "#f59e0b" },
    { name: "Housing", value: 1200, color: "#14b8a6" },
    { name: "Health", value: 75, color: "#ef4444" },
  ]

  const insights = [
    "Your housing costs represent 47% of your monthly expenses, which is slightly above the recommended 30-35%.",
    "Food spending has increased by 15% compared to last month.",
    "You tend to spend more on weekends, particularly on entertainment and dining.",
    "Your shopping expenses are 20% higher than your average over the past 6 months.",
  ]

  return (
    <div className="space-y-8">
      <div className="h-[350px]">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltip>
                        <ChartTooltipContent
                          content={
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm text-muted-foreground">{payload[0]?.name || ""}</span>
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">AI Insights</h3>
        {insights.map((insight, index) => (
          <Alert key={index}>
            <LightbulbIcon className="h-4 w-4" />
            <AlertTitle>Insight {index + 1}</AlertTitle>
            <AlertDescription>{insight}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  )
}

