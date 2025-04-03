import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TransactionsList } from "@/components/transactions/transactions-list"
import { TransactionsTableSkeleton } from "@/components/transactions/transactions-table-skeleton"
import { AddTransactionButton } from "@/components/transactions/add-transaction-button"

export default function TransactionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Transactions" text="Manage your income and expenses.">
        <AddTransactionButton />
      </DashboardHeader>
      <Suspense fallback={<TransactionsTableSkeleton />}>
        <TransactionsList />
      </Suspense>
    </DashboardShell>
  )
}

