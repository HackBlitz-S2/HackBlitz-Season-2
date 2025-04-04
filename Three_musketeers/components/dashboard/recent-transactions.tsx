import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RecentTransactionsProps {
  className?: string
}

export function RecentTransactions({ className }: RecentTransactionsProps) {
  const transactions = [
    {
      id: "1",
      description: "Grocery Shopping",
      amount: -120.5,
      date: "2025-04-01",
      category: "Food",
    },
    {
      id: "2",
      description: "Salary Deposit",
      amount: 3500.0,
      date: "2025-04-01",
      category: "Income",
    },
    {
      id: "3",
      description: "Netflix Subscription",
      amount: -15.99,
      date: "2025-03-31",
      category: "Entertainment",
    },
    {
      id: "4",
      description: "Uber Ride",
      amount: -24.75,
      date: "2025-03-30",
      category: "Transport",
    },
    {
      id: "5",
      description: "Freelance Payment",
      amount: 850.0,
      date: "2025-03-29",
      category: "Income",
    },
  ]

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={transaction.amount > 0 ? "outline" : "secondary"}>{transaction.category}</Badge>
                <span className={cn("font-medium", transaction.amount > 0 ? "text-emerald-500" : "text-rose-500")}>
                  {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

