import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { SpendingTrends } from "@/components/dashboard/spending-trends"
import { BudgetProgress } from "@/components/dashboard/budget-progress"
import { ForecastCard } from "@/components/dashboard/forecast-card"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to FinBuddy, your AI-powered financial assistant." />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RecentTransactions className="col-span-4" />
          <SpendingTrends className="col-span-3" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <BudgetProgress className="col-span-4" />
          <ForecastCard className="col-span-3" />
        </div>
      </Suspense>
    </DashboardShell>
  )
}

