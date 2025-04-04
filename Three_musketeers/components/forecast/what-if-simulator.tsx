"use client"

import { useState } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function WhatIfSimulator() {
  const [incomeChange, setIncomeChange] = useState(0)
  const [expenseChange, setExpenseChange] = useState(0)
  const [savingsChange, setSavingsChange] = useState(0)

  // Base data
  const baseData = [
    { month: "May 2025", base: 4500 },
    { month: "Jun 2025", base: 5600 },
    { month: "Jul 2025", base: 6700 },
    { month: "Aug 2025", base: 7800 },
    { month: "Sep 2025", base: 8900 },
    { month: "Oct 2025", base: 10000 },
  ]

  // Calculate simulated data
  const simulatedData = baseData.map((item, index) => {
    const monthlyEffect = (incomeChange / 100) * 4350 - (expenseChange / 100) * 3250 + (savingsChange / 100) * 1100
    const cumulativeEffect = monthlyEffect * (index + 1)
    return {
      ...item,
      simulated: Math.max(0, item.base + cumulativeEffect),
    }
  })

  const baseEndValue = baseData[baseData.length - 1]?.base || 0
  const simulatedEndValue = simulatedData[simulatedData.length - 1]?.simulated || 0
  const difference = simulatedEndValue - baseEndValue
  const percentChange = baseEndValue !== 0 ? (difference / baseEndValue) * 100 : 0

  return (
    <div className="space-y-8">
      <div className="h-[300px]">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={simulatedData}>
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
                              <div className="text-sm font-medium">{payload[0].payload.month}</div>
                              {payload.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between gap-2">
                                  <span className="text-sm text-muted-foreground capitalize">
                                    {entry.name === "base" ? "Base Projection" : "Simulated"}
                                  </span>
                                  <span className="font-bold">${Math.round(entry.value).toLocaleString()}</span>
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
                name="Base Projection"
                dataKey="base"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                name="Simulated"
                dataKey="simulated"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Simulation Results</CardTitle>
            <CardDescription>Impact on your 6-month savings projection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Base Projection</p>
                  <p className="text-lg font-medium">${baseEndValue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Simulated Projection</p>
                  <p className="text-lg font-medium">${Math.round(simulatedEndValue).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Difference</p>
                  <p
                    className={cn(
                      "text-lg font-medium",
                      difference > 0 ? "text-emerald-500" : difference < 0 ? "text-rose-500" : "",
                    )}
                  >
                    {difference > 0 ? "+" : ""}
                    {Math.round(difference).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Percent Change</p>
                  <p
                    className={cn(
                      "text-lg font-medium",
                      percentChange > 0 ? "text-emerald-500" : percentChange < 0 ? "text-rose-500" : "",
                    )}
                  >
                    {percentChange > 0 ? "+" : ""}
                    {percentChange.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Simulation Parameters</CardTitle>
            <CardDescription>Adjust the sliders to simulate different scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Income Change</label>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      incomeChange > 0 ? "text-emerald-500" : incomeChange < 0 ? "text-rose-500" : "",
                    )}
                  >
                    {incomeChange > 0 ? "+" : ""}
                    {incomeChange}%
                  </span>
                </div>
                <Slider
                  value={[incomeChange]}
                  min={-20}
                  max={20}
                  step={1}
                  onValueChange={(value) => setIncomeChange(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Expense Change</label>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      expenseChange < 0 ? "text-emerald-500" : expenseChange > 0 ? "text-rose-500" : "",
                    )}
                  >
                    {expenseChange > 0 ? "+" : ""}
                    {expenseChange}%
                  </span>
                </div>
                <Slider
                  value={[expenseChange]}
                  min={-20}
                  max={20}
                  step={1}
                  onValueChange={(value) => setExpenseChange(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Monthly Savings Change</label>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      savingsChange > 0 ? "text-emerald-500" : savingsChange < 0 ? "text-rose-500" : "",
                    )}
                  >
                    {savingsChange > 0 ? "+" : ""}
                    {savingsChange}%
                  </span>
                </div>
                <Slider
                  value={[savingsChange]}
                  min={-50}
                  max={50}
                  step={5}
                  onValueChange={(value) => setSavingsChange(value[0])}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          className="w-full max-w-md"
          onClick={() => {
            setIncomeChange(0)
            setExpenseChange(0)
            setSavingsChange(0)
          }}
        >
          <PlayIcon className="mr-2 h-4 w-4" />
          Reset Simulation
        </Button>
      </div>
    </div>
  )
}

