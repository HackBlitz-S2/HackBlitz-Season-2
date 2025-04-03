"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowRight, Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function BudgetAdjustments() {
  const [categories, setCategories] = useState([
    { id: "1", name: "Food & Groceries", budget: 600, min: 400, max: 800, color: "#10b981", adjustment: 0 },
    { id: "2", name: "Transportation", budget: 200, min: 150, max: 300, color: "#3b82f6", adjustment: 0 },
    { id: "3", name: "Entertainment", budget: 150, min: 50, max: 250, color: "#8b5cf6", adjustment: 0 },
    { id: "4", name: "Shopping", budget: 300, min: 100, max: 500, color: "#f43f5e", adjustment: 0 },
    { id: "5", name: "Utilities", budget: 250, min: 200, max: 300, color: "#f59e0b", adjustment: 0 },
  ])

  const [scenario, setScenario] = useState({
    title: "Car Repair",
    description: "You need $150 for an unexpected car repair this month.",
    amount: 150,
    applied: false,
  })

  const totalAdjustment = categories.reduce((sum, cat) => sum + cat.adjustment, 0)
  const remainingNeeded = scenario.amount - totalAdjustment

  const handleSliderChange = (index: number, value: number[]) => {
    const newCategories = [...categories]
    const newAdjustment = value[0] - newCategories[index].budget
    newCategories[index].adjustment = newAdjustment
    setCategories(newCategories)
  }

  const applyAdjustments = () => {
    setScenario((prev) => ({ ...prev, applied: true }))
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Unexpected Expense: {scenario.title}</AlertTitle>
        <AlertDescription>{scenario.description}</AlertDescription>
      </Alert>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Amount Needed</h3>
          <p className="text-3xl font-bold">${scenario.amount.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-right">Remaining</h3>
          <p
            className={cn("text-3xl font-bold text-right", remainingNeeded <= 0 ? "text-emerald-500" : "text-rose-500")}
          >
            ${remainingNeeded.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Adjust Your Budget Categories</h3>
        {categories.map((category, index) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <CardTitle className="text-base">{category.name}</CardTitle>
                </div>
                <Badge variant={category.adjustment < 0 ? "default" : "outline"}>
                  {category.adjustment === 0
                    ? "No Change"
                    : category.adjustment < 0
                      ? `-$${Math.abs(category.adjustment).toFixed(2)}`
                      : `+$${category.adjustment.toFixed(2)}`}
                </Badge>
              </div>
              <CardDescription>Current budget: ${category.budget.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-2">
                <Slider
                  defaultValue={[category.budget]}
                  min={category.min}
                  max={category.max}
                  step={10}
                  onValueChange={(value) => handleSliderChange(index, value)}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>${category.min.toFixed(2)}</span>
                  <span>${category.max.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                New budget: ${(category.budget + category.adjustment).toFixed(2)}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          className="w-full max-w-md"
          disabled={remainingNeeded > 0 || scenario.applied}
          onClick={applyAdjustments}
        >
          {scenario.applied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Adjustments Applied
            </>
          ) : (
            <>
              <ArrowRight className="mr-2 h-4 w-4" />
              Apply Budget Adjustments
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

