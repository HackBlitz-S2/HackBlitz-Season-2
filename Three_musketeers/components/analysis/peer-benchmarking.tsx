"use client"

import { ChartContainer } from "@/components/ui/chart"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function PeerBenchmarking() {
  const data = [
    { category: "Food", you: 450, peers: 380 },
    { category: "Transport", you: 180, peers: 200 },
    { category: "Entertainment", you: 120, peers: 150 },
    { category: "Shopping", you: 350, peers: 280 },
    { category: "Utilities", you: 180, peers: 190 },
    { category: "Housing", you: 1200, peers: 1100 },
    { category: "Health", you: 75, peers: 120 },
  ]

  const insights = [
    "You spend 18% more on food than similar users in your income bracket.",
    "Your shopping expenses are 25% higher than your peers.",
    "You're spending less on health than 80% of similar users.",
    "Your housing costs are slightly above average for your income level.",
    "Your transportation costs are 10% lower than average, which is good!",
  ]

  return (
    <div className="space-y-8">
      <div className="h-[400px]">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
              <Radar
                name="You"
                dataKey="you"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
              <Radar
                name="Similar Users"
                dataKey="peers"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Peer Comparison Insights</h3>
        {insights.map((insight, index) => (
          <Alert key={index} variant="outline">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Comparison {index + 1}</AlertTitle>
            <AlertDescription>{insight}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  )
}

