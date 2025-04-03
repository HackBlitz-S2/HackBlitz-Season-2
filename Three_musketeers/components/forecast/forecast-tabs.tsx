"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SavingsProjection } from "@/components/forecast/savings-projection"
import { WhatIfSimulator } from "@/components/forecast/what-if-simulator"
import { MilestoneTracker } from "@/components/forecast/milestone-tracker"

export function ForecastTabs() {
  return (
    <Tabs defaultValue="projections" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="projections">Savings Projections</TabsTrigger>
        <TabsTrigger value="simulator">What-If Simulator</TabsTrigger>
        <TabsTrigger value="milestones">Milestone Tracker</TabsTrigger>
      </TabsList>
      <TabsContent value="projections">
        <Card>
          <CardHeader>
            <CardTitle>6-Month Savings Projection</CardTitle>
            <CardDescription>Forecast of your savings growth over the next 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <SavingsProjection />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="simulator">
        <Card>
          <CardHeader>
            <CardTitle>What-If Simulator</CardTitle>
            <CardDescription>Simulate different financial scenarios and see their impact.</CardDescription>
          </CardHeader>
          <CardContent>
            <WhatIfSimulator />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="milestones">
        <Card>
          <CardHeader>
            <CardTitle>Financial Milestones</CardTitle>
            <CardDescription>Track your progress towards important financial milestones.</CardDescription>
          </CardHeader>
          <CardContent>
            <MilestoneTracker />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

