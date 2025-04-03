import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BudgetSkeleton() {
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

