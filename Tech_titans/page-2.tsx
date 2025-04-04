"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Home, LogOut, PlusCircle, Settings, User } from "lucide-react"
import { MedicationCard } from "@/components/medication-card"
import { MedicationReminder } from "@/components/medication-reminder"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("today")

  // Sample data - in a real app, this would come from a database
  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      time: "8:00 AM",
      instructions: "Take with food",
      nextDose: new Date(new Date().setHours(8, 0, 0, 0)),
      taken: false,
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "9:00 AM, 9:00 PM",
      instructions: "Take with meals",
      nextDose: new Date(new Date().setHours(9, 0, 0, 0)),
      taken: true,
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      time: "8:00 PM",
      instructions: "Take in the evening",
      nextDose: new Date(new Date().setHours(20, 0, 0, 0)),
      taken: false,
    },
  ]

  const upcomingMedications = medications.filter((med) => !med.taken)
  const todaysMedications = [...medications]
  const allMedications = [...medications]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-sky-500"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            <span className="text-xl font-bold">MedGuard</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Profile">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/medications"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
                >
                  <PlusCircle className="h-4 w-4" />
                  Medications
                </Link>
                <Link
                  href="/dashboard/calendar"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
                >
                  <Calendar className="h-4 w-4" />
                  Calendar
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-500">Manage your medications and stay on track</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming Doses</CardTitle>
                    <CardDescription>Your next medication doses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {upcomingMedications.length > 0 ? (
                        upcomingMedications.map((med) => <MedicationReminder key={med.id} medication={med} />)
                      ) : (
                        <p className="text-sm text-gray-500">No upcoming doses</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Adherence Rate</CardTitle>
                    <CardDescription>Your medication adherence this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center space-y-2 py-4">
                      <div className="text-4xl font-bold">85%</div>
                      <p className="text-sm text-gray-500">Great job! Keep it up.</p>
                      <div className="h-4 w-full rounded-full bg-gray-100">
                        <div className="h-4 rounded-full bg-sky-500" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Caregiver Alerts</CardTitle>
                    <CardDescription>Notifications sent to caregivers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center space-y-2 py-4">
                      <div className="text-4xl font-bold">0</div>
                      <p className="text-sm text-gray-500">No missed doses this week</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Tabs defaultValue="today" className="w-full" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="all">All Medications</TabsTrigger>
                  </TabsList>
                  <Link href="/dashboard/medications/add">
                    <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Medication
                    </Button>
                  </Link>
                </div>
                <TabsContent value="today" className="mt-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {todaysMedications.map((medication) => (
                      <MedicationCard key={medication.id} medication={medication} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="all" className="mt-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {allMedications.map((medication) => (
                      <MedicationCard key={medication.id} medication={medication} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

