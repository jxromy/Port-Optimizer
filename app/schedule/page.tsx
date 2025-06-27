"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Truck, AlertTriangle, CheckCircle, RefreshCw, Settings } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { TimeSlot } from "@/components/time-slot"

export default function Schedule() {
  const [workingHours, setWorkingHours] = useState({ start: "06:00", end: "18:00" })
  const [selectedSlot, setSelectedSlot] = useState("14:30")
  const [requestReason, setRequestReason] = useState("")

  const timeSlots = [
    { time: "08:30", status: "optimal", congestion: 15, queue: 5 },
    { time: "10:15", status: "good", congestion: 25, queue: 8 },
    { time: "12:00", status: "busy", congestion: 65, queue: 18 },
    { time: "14:30", status: "assigned", congestion: 35, queue: 12 },
    { time: "16:45", status: "available", congestion: 45, queue: 15 },
    { time: "18:00", status: "peak", congestion: 85, queue: 25 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Schedule Optimizer</h1>
          <Button variant="ghost" size="icon" className="text-white">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-blue-100 text-sm mt-1">AI-powered trip optimization</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Working Hours */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Working Hours
            </CardTitle>
            <CardDescription>Set your available working hours for optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time" className="text-sm">
                  Start Time
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={workingHours.start}
                  onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="end-time" className="text-sm">
                  End Time
                </Label>
                <Input
                  id="end-time"
                  type="time"
                  value={workingHours.end}
                  onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
                />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Update Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Current Assignment */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Current Assignment</CardTitle>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Confirmed
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">14:30 Today</p>
                <p className="text-sm text-gray-600">Container: MSKU-7834521</p>
                <p className="text-sm text-gray-600">Gate A2 • Bay 15</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Est. Queue</p>
                <p className="font-semibold">12 min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Time Slots */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Alternative Time Slots</CardTitle>
            <CardDescription>Request a different pickup time within your working hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {timeSlots.map((slot) => (
              <TimeSlot
                key={slot.time}
                time={slot.time}
                status={slot.status}
                congestion={slot.congestion}
                queue={slot.queue}
                isSelected={selectedSlot === slot.time}
                onSelect={() => setSelectedSlot(slot.time)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Request Alternative */}
        {selectedSlot !== "14:30" && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Request Time Change</CardTitle>
              <CardDescription>Explain why you need a different pickup time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reason" className="text-sm">
                  Reason for change
                </Label>
                <Textarea
                  id="reason"
                  placeholder="e.g., Traffic delay, vehicle maintenance, driver availability..."
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Submit Request</Button>
                <Button variant="outline" onClick={() => setSelectedSlot("14:30")}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Insights */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <p className="text-sm">Peak congestion expected between 12:00-13:00 and 17:00-18:00</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <p className="text-sm">Your current 14:30 slot avoids peak hours and has moderate queue times</p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm">Consider 08:30 slot for fastest processing (5 min queue)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav activeTab="schedule" />
    </div>
  )
}
