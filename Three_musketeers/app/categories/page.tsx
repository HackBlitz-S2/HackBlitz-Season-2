import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CategoriesList } from "@/components/categories/categories-list"
import { CategoriesTableSkeleton } from "@/components/categories/categories-table-skeleton"
import { AddCategoryButton } from "@/components/categories/add-category-button"

export default function CategoriesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Smart Categories" text="Manage your spending categories and limits.">
        <AddCategoryButton />
      </DashboardHeader>
      <Suspense fallback={<CategoriesTableSkeleton />}>
        <CategoriesList />
      </Suspense>
    </DashboardShell>
  )
}

