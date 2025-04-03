import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ForecastTabs } from "@/components/forecast/forecast-tabs"
import { ForecastSkeleton } from "@/components/forecast/forecast-skeleton"

export default function ForecastPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Financial Forecasting"
        text="View 6-month projections and simulate financial scenarios."
      />
      <Suspense fallback={<ForecastSkeleton />}>
        <ForecastTabs />
      </Suspense>
    </DashboardShell>
  )
}

