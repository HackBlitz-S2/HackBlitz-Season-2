import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AnalysisTabs } from "@/components/analysis/analysis-tabs"
import { AnalysisSkeleton } from "@/components/analysis/analysis-skeleton"

export default function AnalysisPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="AI Analysis" text="Get AI-powered insights into your spending patterns." />
      <Suspense fallback={<AnalysisSkeleton />}>
        <AnalysisTabs />
      </Suspense>
    </DashboardShell>
  )
}

