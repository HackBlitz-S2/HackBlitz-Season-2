import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface BudgetProgressProps {
  className?: string
}

export function BudgetProgress({ className }: BudgetProgressProps) {
  const categories = [
    {
      id: "1",
      name: "Food & Groceries",
      spent: 450,
      budget: 600,
      percentage: 75,
    },
    {
      id: "2",
      name: "Transportation",
      spent: 180,
      budget: 200,
      percentage: 90,
    },
    {
      id: "3",
      name: "Entertainment",
      spent: 120,
      budget: 150,
      percentage: 80,
    },
    {
      id: "4",
      name: "Shopping",
      spent: 350,
      budget: 300,
      percentage: 117,
    },
    {
      id: "5",
      name: "Utilities",
      spent: 180,
      budget: 250,
      percentage: 72,
    },
  ]

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>Your monthly budget utilization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">
                  ${category.spent} / ${category.budget}
                </span>
              </div>
              <Progress
                value={category.percentage}
                className={cn(category.percentage > 100 ? "bg-rose-100 dark:bg-rose-950" : "")}
                indicatorClassName={cn(category.percentage > 100 ? "bg-rose-500" : "")}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

