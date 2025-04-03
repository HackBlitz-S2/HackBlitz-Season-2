import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { BudgetTabs } from "@/components/budget/budget-tabs"
import { BudgetSkeleton } from "@/components/budget/budget-skeleton"

export default function BudgetPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Budgeting Assistant"
        text="Create and manage AI-generated budgets based on your spending patterns."
      />
      <Suspense fallback={<BudgetSkeleton />}>
        <BudgetTabs />
      </Suspense>
    </DashboardShell>
  )
}

