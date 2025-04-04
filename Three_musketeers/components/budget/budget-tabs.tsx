"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetRecommendations } from "@/components/budget/budget-recommendations"
import { BudgetAdjustments } from "@/components/budget/budget-adjustments"
import { GoalBasedBudget } from "@/components/budget/goal-based-budget"

export function BudgetTabs() {
  return (
    <Tabs defaultValue="recommendations" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        <TabsTrigger value="adjustments">Dynamic Adjustments</TabsTrigger>
        <TabsTrigger value="goals">Goal-Based Budget</TabsTrigger>
      </TabsList>
      <TabsContent value="recommendations">
        <Card>
          <CardHeader>
            <CardTitle>AI Budget Recommendations</CardTitle>
            <CardDescription>
              Smart budget suggestions based on your income, expenses, and spending patterns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetRecommendations />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="adjustments">
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Budget Adjustments</CardTitle>
            <CardDescription>Adjust your budget categories based on real-time spending needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetAdjustments />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="goals">
        <Card>
          <CardHeader>
            <CardTitle>Goal-Based Budgeting</CardTitle>
            <CardDescription>Create budgets aligned with your financial goals.</CardDescription>
          </CardHeader>
          <CardContent>
            <GoalBasedBudget />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

