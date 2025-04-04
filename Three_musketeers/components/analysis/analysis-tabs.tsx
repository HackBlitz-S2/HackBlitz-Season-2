"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SpendingPatternAnalysis } from "@/components/analysis/spending-pattern-analysis"
import { AnomalyDetection } from "@/components/analysis/anomaly-detection"
import { PeerBenchmarking } from "@/components/analysis/peer-benchmarking"

export function AnalysisTabs() {
  return (
    <Tabs defaultValue="patterns" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="patterns">Spending Patterns</TabsTrigger>
        <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
        <TabsTrigger value="benchmarking">Peer Benchmarking</TabsTrigger>
      </TabsList>
      <TabsContent value="patterns">
        <Card>
          <CardHeader>
            <CardTitle>Spending Pattern Analysis</CardTitle>
            <CardDescription>AI-powered analysis of your spending habits and trends.</CardDescription>
          </CardHeader>
          <CardContent>
            <SpendingPatternAnalysis />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="anomalies">
        <Card>
          <CardHeader>
            <CardTitle>Anomaly Detection</CardTitle>
            <CardDescription>Unusual spending patterns and potential issues detected by AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnomalyDetection />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="benchmarking">
        <Card>
          <CardHeader>
            <CardTitle>Peer Benchmarking</CardTitle>
            <CardDescription>Compare your spending habits with similar users.</CardDescription>
          </CardHeader>
          <CardContent>
            <PeerBenchmarking />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

