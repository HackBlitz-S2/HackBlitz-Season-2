import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ForecastSkeleton() {
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
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[350px] mt-2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <Skeleton className="h-[400px] w-full" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

