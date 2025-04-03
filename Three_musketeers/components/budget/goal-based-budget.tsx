"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts"
import { Target } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GoalBasedBudget() {
  const [selectedGoal, setSelectedGoal] = useState("vacation")

  const goals = {
    vacation: {
      name: "Vacation Fund",
      target: 3000,
      current: 1200,
      monthly: 500,
      timeframe: "6 months",
      projectedCompletion: "October 2025",
      data: [
        { month: "May", amount: 1200 },
        { month: "Jun", amount: 1700 },
        { month: "Jul", amount: 2200 },
        { month: "Aug", amount: 2700 },
        { month: "Sep", amount: 3000 },
      ],
    },
    emergency: {
      name: "Emergency Fund",
      target: 10000,
      current: 3500,
      monthly: 750,
      timeframe: "9 months",
      projectedCompletion: "January 2026",
      data: [
        { month: "May", amount: 3500 },
        { month: "Jun", amount: 4250 },
        { month: "Jul", amount: 5000 },
        { month: "Aug", amount: 5750 },
        { month: "Sep", amount: 6500 },
        { month: "Oct", amount: 7250 },
        { month: "Nov", amount: 8000 },
        { month: "Dec", amount: 8750 },
        { month: "Jan", amount: 10000 },
      ],
    },
    downpayment: {
      name: "Home Down Payment",
      target: 50000,
      current: 15000,
      monthly: 1000,
      timeframe: "36 months",
      projectedCompletion: "April 2028",
      data: [
        { month: "Q2 2025", amount: 15000 },
        { month: "Q3 2025", amount: 18000 },
        { month: "Q4 2025", amount: 21000 },
        { month: "Q1 2026", amount: 24000 },
        { month: "Q2 2026", amount: 27000 },
        { month: "Q3 2026", amount: 30000 },
        { month: "Q4 2026", amount: 33000 },
        { month: "Q1 2027", amount: 36000 },
        { month: "Q2 2027", amount: 39000 },
        { month: "Q3 2027", amount: 42000 },
        { month: "Q4 2027", amount: 45000 },
        { month: "Q1 2028", amount: 48000 },
        { month: "Q2 2028", amount: 50000 },
      ],
    },
  }

  const selectedGoalData = goals[selectedGoal as keyof typeof goals]
  const progressPercentage = (selectedGoalData.current / selectedGoalData.target) * 100
  const remainingAmount = selectedGoalData.target - selectedGoalData.current

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Select Financial Goal</h3>
        <Select value={selectedGoal} onValueChange={setSelectedGoal}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vacation">Vacation Fund</SelectItem>
            <SelectItem value="emergency">Emergency Fund</SelectItem>
            <SelectItem value="downpayment">Home Down Payment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>{selectedGoalData.name}</CardTitle>
          </div>
          <CardDescription>
            Target: ${selectedGoalData.target.toLocaleString()} • Timeframe: {selectedGoalData.timeframe}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${selectedGoalData.current.toLocaleString()} saved</span>
              <span>${remainingAmount.toLocaleString()} to go</span>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-medium mb-2">Projected Growth</h4>
            <div className="h-[200px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedGoalData.data}>
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
                                      <span className="text-sm text-muted-foreground">{payload[0].payload.month}</span>
                                      <span className="font-bold">${payload[0].value.toLocaleString()}</span>
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
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <ReferenceLine y={selectedGoalData.target} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm font-medium">Monthly Contribution</p>
            <p className="text-2xl font-bold">${selectedGoalData.monthly}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Projected Completion</p>
            <p className="text-lg font-medium">{selectedGoalData.projectedCompletion}</p>
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-center">
        <Button className="w-full max-w-md">Adjust Monthly Contribution</Button>
      </div>
    </div>
  )
}

