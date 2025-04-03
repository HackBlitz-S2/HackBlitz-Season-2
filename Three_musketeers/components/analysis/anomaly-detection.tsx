"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts"
import { AlertTriangle, TrendingUp } from "lucide-react"

export function AnomalyDetection() {
  const shoppingData = [
    { month: "Nov", amount: 250 },
    { month: "Dec", amount: 280 },
    { month: "Jan", amount: 300 },
    { month: "Feb", amount: 270 },
    { month: "Mar", amount: 350 },
    { month: "Apr", amount: 1050 }, // Anomaly
  ]

  const diningData = [
    { month: "Nov", amount: 150 },
    { month: "Dec", amount: 180 },
    { month: "Jan", amount: 160 },
    { month: "Feb", amount: 170 },
    { month: "Mar", amount: 190 },
    { month: "Apr", amount: 450 }, // Anomaly
  ]

  const anomalies = [
    {
      title: "Shopping Spike",
      description: "300% increase in shopping expenses this month compared to your average.",
      severity: "high",
      data: shoppingData,
      average: 290,
    },
    {
      title: "Dining Out Increase",
      description: "You've spent 137% more on dining out this month than your usual average.",
      severity: "medium",
      data: diningData,
      average: 170,
    },
  ]

  return (
    <div className="space-y-6">
      {anomalies.map((anomaly, index) => (
        <Card key={index} className={anomaly.severity === "high" ? "border-rose-500" : "border-amber-500"}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className={anomaly.severity === "high" ? "text-rose-500" : "text-amber-500"} />
              <CardTitle>{anomaly.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <AlertDescription className="mb-4">{anomaly.description}</AlertDescription>
            <div className="h-[200px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={anomaly.data}>
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
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-sm text-muted-foreground">
                                        {payload[0]?.payload?.month || ""}
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
                    <Bar
                      dataKey="amount"
                      fill={anomaly.severity === "high" ? "hsl(var(--rose-500))" : "hsl(var(--amber-500))"}
                      radius={[4, 4, 0, 0]}
                    />
                    <ReferenceLine y={anomaly.average} stroke="hsl(var(--primary))" strokeDasharray="3 3" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Alert className="w-full">
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Recommendation</AlertTitle>
              <AlertDescription>
                {anomaly.severity === "high"
                  ? "Review your recent shopping transactions to identify any unusual purchases or potential fraud."
                  : "Consider setting a dining budget to manage these expenses better in the future."}
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

