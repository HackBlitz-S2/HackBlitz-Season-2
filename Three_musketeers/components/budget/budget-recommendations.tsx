"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function BudgetRecommendations() {
  const currentBudget = [
    { name: "Food", value: 600, color: "#10b981" },
    { name: "Transport", value: 200, color: "#3b82f6" },
    { name: "Entertainment", value: 150, color: "#8b5cf6" },
    { name: "Shopping", value: 300, color: "#f43f5e" },
    { name: "Utilities", value: 250, color: "#f59e0b" },
    { name: "Housing", value: 1200, color: "#14b8a6" },
    { name: "Health", value: 150, color: "#ef4444" },
    { name: "Savings", value: 500, color: "#6366f1" },
  ]

  const recommendedBudget = [
    { name: "Food", value: 550, color: "#10b981", change: -50 },
    { name: "Transport", value: 200, color: "#3b82f6", change: 0 },
    { name: "Entertainment", value: 120, color: "#8b5cf6", change: -30 },
    { name: "Shopping", value: 250, color: "#f43f5e", change: -50 },
    { name: "Utilities", value: 250, color: "#f59e0b", change: 0 },
    { name: "Housing", value: 1200, color: "#14b8a6", change: 0 },
    { name: "Health", value: 180, color: "#ef4444", change: +30 },
    { name: "Savings", value: 600, color: "#6366f1", change: +100 },
  ]

  const savingsIncrease =
    (recommendedBudget.find((i) => i.name === "Savings")?.value || 0) -
    (currentBudget.find((i) => i.name === "Savings")?.value || 0)

  const totalCurrent = currentBudget.reduce((sum, item) => sum + item.value, 0)
  const totalRecommended = recommendedBudget.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Budget</CardTitle>
            <CardDescription>Your current monthly budget allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentBudget}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {currentBudget.map((entry, index) => (
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
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <p className="text-sm text-muted-foreground">Total: ${totalCurrent}</p>
              <p className="text-sm text-muted-foreground">
                Savings: ${currentBudget.find((i) => i.name === "Savings")?.value || 0}
              </p>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Budget</CardTitle>
            <CardDescription>AI-optimized budget based on your spending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={recommendedBudget}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {recommendedBudget.map((entry, index) => (
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
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <p className="text-sm text-muted-foreground">Total: ${totalRecommended}</p>
              <p className="text-sm text-emerald-500 font-medium">
                Savings: ${recommendedBudget.find((i) => i.name === "Savings")?.value || 0} (+${savingsIncrease})
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recommended Changes</h3>
        <div className="space-y-4">
          {recommendedBudget.map(
            (item, index) =>
              item.change !== 0 && (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full")} style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("font-medium", item.change > 0 ? "text-emerald-500" : "text-rose-500")}>
                      {item.change > 0 ? "+" : ""}
                      {item.change}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ${currentBudget.find((i) => i.name === item.name)?.value || 0} → ${item.value}
                    </span>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="w-full max-w-md">
          <ThumbsUp className="mr-2 h-4 w-4" />
          Apply Recommended Budget
        </Button>
      </div>
    </div>
  )
}

