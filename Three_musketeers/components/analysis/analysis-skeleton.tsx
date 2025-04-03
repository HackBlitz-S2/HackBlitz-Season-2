import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnalysisSkeleton() {
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
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[350px] mt-2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

