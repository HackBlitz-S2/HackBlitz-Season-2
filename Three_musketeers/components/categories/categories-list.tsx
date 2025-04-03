"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { cn } from "@/lib/utils"

export function CategoriesList() {
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Food & Groceries",
      spent: 450,
      budget: 600,
      percentage: 75,
      color: "bg-emerald-500",
      autoCategorizationRules: ["Grocery", "Supermarket", "Restaurant"],
    },
    {
      id: "2",
      name: "Transportation",
      spent: 180,
      budget: 200,
      percentage: 90,
      color: "bg-blue-500",
      autoCategorizationRules: ["Uber", "Lyft", "Gas", "Parking"],
    },
    {
      id: "3",
      name: "Entertainment",
      spent: 120,
      budget: 150,
      percentage: 80,
      color: "bg-purple-500",
      autoCategorizationRules: ["Netflix", "Cinema", "Spotify", "Concert"],
    },
    {
      id: "4",
      name: "Shopping",
      spent: 350,
      budget: 300,
      percentage: 117,
      color: "bg-rose-500",
      autoCategorizationRules: ["Amazon", "Target", "Walmart", "Clothing"],
    },
    {
      id: "5",
      name: "Utilities",
      spent: 180,
      budget: 250,
      percentage: 72,
      color: "bg-amber-500",
      autoCategorizationRules: ["Electric", "Water", "Internet", "Phone"],
    },
    {
      id: "6",
      name: "Housing",
      spent: 1200,
      budget: 1200,
      percentage: 100,
      color: "bg-teal-500",
      autoCategorizationRules: ["Rent", "Mortgage", "Insurance"],
    },
    {
      id: "7",
      name: "Health",
      spent: 75,
      budget: 150,
      percentage: 50,
      color: "bg-red-500",
      autoCategorizationRules: ["Pharmacy", "Doctor", "Gym", "Fitness"],
    },
  ])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Auto-Categorization Rules</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", category.color)} />
                  <span className="font-medium">{category.name}</span>
                </div>
              </TableCell>
              <TableCell>${category.budget.toFixed(2)}</TableCell>
              <TableCell>${category.spent.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={category.percentage}
                    className={cn("w-[100px]", category.percentage > 100 ? "bg-rose-100 dark:bg-rose-950" : "")}
                    indicatorClassName={cn(category.percentage > 100 ? "bg-rose-500" : category.color)}
                  />
                  <span className={cn("text-xs", category.percentage > 100 ? "text-rose-500" : "")}>
                    {category.percentage}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {category.autoCategorizationRules.map((rule, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {rule}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-rose-500">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

