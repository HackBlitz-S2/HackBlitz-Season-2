"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

export function TransactionsList() {
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      description: "Grocery Shopping",
      amount: -120.5,
      date: "2025-04-01",
      category: "Food",
      paymentMethod: "Credit Card",
      recurring: false,
    },
    {
      id: "2",
      description: "Salary Deposit",
      amount: 3500.0,
      date: "2025-04-01",
      category: "Income",
      paymentMethod: "Bank Transfer",
      recurring: true,
    },
    {
      id: "3",
      description: "Netflix Subscription",
      amount: -15.99,
      date: "2025-03-31",
      category: "Entertainment",
      paymentMethod: "Credit Card",
      recurring: true,
    },
    {
      id: "4",
      description: "Uber Ride",
      amount: -24.75,
      date: "2025-03-30",
      category: "Transport",
      paymentMethod: "Credit Card",
      recurring: false,
    },
    {
      id: "5",
      description: "Freelance Payment",
      amount: 850.0,
      date: "2025-03-29",
      category: "Income",
      paymentMethod: "Bank Transfer",
      recurring: false,
    },
    {
      id: "6",
      description: "Rent Payment",
      amount: -1200.0,
      date: "2025-03-28",
      category: "Housing",
      paymentMethod: "Bank Transfer",
      recurring: true,
    },
    {
      id: "7",
      description: "Gym Membership",
      amount: -50.0,
      date: "2025-03-27",
      category: "Health",
      paymentMethod: "Credit Card",
      recurring: true,
    },
    {
      id: "8",
      description: "Amazon Purchase",
      amount: -89.99,
      date: "2025-03-26",
      category: "Shopping",
      paymentMethod: "Credit Card",
      recurring: false,
    },
  ])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Recurring</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.description}</TableCell>
              <TableCell>
                <Badge variant="outline">{transaction.category}</Badge>
              </TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell className={cn("font-medium", transaction.amount > 0 ? "text-emerald-500" : "text-rose-500")}>
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell>{transaction.paymentMethod}</TableCell>
              <TableCell>{transaction.recurring ? "Yes" : "No"}</TableCell>
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

