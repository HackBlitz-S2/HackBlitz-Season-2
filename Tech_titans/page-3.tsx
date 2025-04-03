"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus } from "lucide-react"

export default function AddMedicationPage() {
  const [medicationName, setMedicationName] = useState("")
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("")
  const [time, setTime] = useState("")
  const [instructions, setInstructions] = useState("")
  const [reminderTimes, setReminderTimes] = useState([{ time: "" }])

  const handleAddReminderTime = () => {
    setReminderTimes([...reminderTimes, { time: "" }])
  }

  const handleReminderTimeChange = (index: number, value: string) => {
    const updatedTimes = [...reminderTimes]
    updatedTimes[index].time = value
    setReminderTimes(updatedTimes)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the medication to the database
    console.log({
      medicationName,
      dosage,
      frequency,
      time,
      instructions,
      reminderTimes,
    })
    // Redirect to dashboard
  }

  return (
    <div className="container max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add Medication</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Medication Details</CardTitle>
            <CardDescription>Enter the details of your medication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="medication-name">Medication Name</Label>
                <Input
                  id="medication-name"
                  placeholder="e.g., Lisinopril"
                  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="e.g., 10mg"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency} required>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once-daily">Once Daily</SelectItem>
                    <SelectItem value="twice-daily">Twice Daily</SelectItem>
                    <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                    <SelectItem value="four-times-daily">Four Times Daily</SelectItem>
                    <SelectItem value="as-needed">As Needed</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time of Day</Label>
                <Select value={time} onValueChange={setTime} required>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="bedtime">Bedtime</SelectItem>
                    <SelectItem value="with-meals">With Meals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="e.g., Take with food"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Reminder Times</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddReminderTime}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Time
                </Button>
              </div>
              {reminderTimes.map((reminder, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={reminder.time}
                    onChange={(e) => handleReminderTimeChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
              Save Medication
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

