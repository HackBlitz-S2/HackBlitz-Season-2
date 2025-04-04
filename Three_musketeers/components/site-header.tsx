"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PieChart, Tags, TrendingUp, Wallet, BarChart } from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Wallet className="h-6 w-6" />
            <span className="inline-block font-bold">FinBuddy</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/" && "text-foreground",
              )}
            >
              <Home className="mr-1 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/transactions"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/transactions" && "text-foreground",
              )}
            >
              <Wallet className="mr-1 h-4 w-4" />
              Transactions
            </Link>
            <Link
              href="/categories"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/categories" && "text-foreground",
              )}
            >
              <Tags className="mr-1 h-4 w-4" />
              Categories
            </Link>
            <Link
              href="/analysis"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/analysis" && "text-foreground",
              )}
            >
              <PieChart className="mr-1 h-4 w-4" />
              Analysis
            </Link>
            <Link
              href="/budget"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/budget" && "text-foreground",
              )}
            >
              <BarChart className="mr-1 h-4 w-4" />
              Budget
            </Link>
            <Link
              href="/forecast"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/forecast" && "text-foreground",
              )}
            >
              <TrendingUp className="mr-1 h-4 w-4" />
              Forecast
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}

