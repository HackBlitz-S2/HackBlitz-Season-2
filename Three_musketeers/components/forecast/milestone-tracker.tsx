"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function MilestoneTracker() {
  const milestones = [
    {
      id: "1",
      title: "Emergency Fund",
      description: "3 months of expenses saved",
      target: 10000,
      current: 3500,
      percentage: 35,
      projectedDate: "January 2026",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Vacation Fund",
      description: "Summer trip to Europe",
      target: 3000,
      current: 1200,
      percentage: 40,
      projectedDate: "October 2025",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Debt Reduction",
      description: "Pay off credit card debt",
      target: 5000,
      current: 5000,
      percentage: 100,
      projectedDate: "Completed",
      status: "completed",
    },
    {
      id: "4",
      title: "Home Down Payment",
      description: "20% down payment for a house",
      target: 50000,
      current: 15000,
      percentage: 30,
      projectedDate: "April 2028",
      status: "in-progress",
    },
    {
      id: "5",
      title: "New Car Fund",
      description: "Save for a new vehicle",
      target: 20000,
      current: 0,
      percentage: 0,
      projectedDate: "Not started",
      status: "not-started",
    },
  ]

  return (
    <div className="space-y-6">
      {milestones.map((milestone) => (
        <Card key={milestone.id} className={cn(milestone.status === "completed" ? "border-emerald-500" : "")}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {milestone.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Clock className="h-5 w-5 text-primary" />
                )}
                <CardTitle className="text-base">{milestone.title}</CardTitle>
              </div>
              <Badge
                variant={
                  milestone.status === "completed"
                    ? "default"
                    : milestone.status === "in-progress"
                      ? "outline"
                      : "secondary"
                }
              >
                {milestone.status === "completed"
                  ? "Completed"
                  : milestone.status === "in-progress"
                    ? "In Progress"
                    : "Not Started"}
              </Badge>
            </div>
            <CardDescription>{milestone.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">{milestone.percentage}%</span>
              </div>
              <Progress
                value={milestone.percentage}
                className={cn(milestone.status === "completed" ? "bg-emerald-100 dark:bg-emerald-950" : "")}
                indicatorClassName={cn(milestone.status === "completed" ? "bg-emerald-500" : "")}
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${milestone.current.toLocaleString()} saved</span>
                <span>${(milestone.target - milestone.current).toLocaleString()} to go</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Projected completion: {milestone.projectedDate}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

