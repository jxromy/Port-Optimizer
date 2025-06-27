"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, MapPin, Truck, AlertCircle, CheckCircle, Navigation, Container, Bell } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { StatusIndicator } from "@/components/status-indicator"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [nextPickup, setNextPickup] = useState({
    time: "14:30",
    date: "Today",
    gate: "Gate A2",
    container: "MSKU-7834521",
    status: "confirmed",
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const congestionLevel = 35 // Simulated real-time data
  const queueTime = 12 // minutes

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Port Optimizer</h1>
            <p className="text-blue-100 text-sm">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Next Pickup Card */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Next Pickup</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Confirmed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-lg">
                  {nextPickup.time} - {nextPickup.date}
                </p>
                <p className="text-sm text-gray-600">Optimal arrival time</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">{nextPickup.gate}</p>
                <p className="text-sm text-gray-600">Entry point</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Container className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">{nextPickup.container}</p>
                <p className="text-sm text-gray-600">Container ID</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" size="sm">
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                Check In
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Port Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Port Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Congestion Level</span>
                <StatusIndicator level={congestionLevel} />
              </div>
              <Progress value={congestionLevel} className="h-2" />
              <p className="text-xs text-gray-600 mt-1">
                {congestionLevel < 30 ? "Low" : congestionLevel < 70 ? "Moderate" : "High"} congestion
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{queueTime}</p>
                <p className="text-xs text-gray-600">Min Queue Time</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-xs text-gray-600">Available Cranes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
                <Clock className="h-5 w-5" />
                <span className="text-xs">Reschedule</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
                <MapPin className="h-5 w-5" />
                <span className="text-xs">View Map</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
                <Container className="h-5 w-5" />
                <span className="text-xs">Cargo Info</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
                <AlertCircle className="h-5 w-5" />
                <span className="text-xs">Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Pickup completed</p>
                <p className="text-xs text-gray-600">Container MSKU-7834520 - 11:45 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <Clock className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Schedule optimized</p>
                <p className="text-xs text-gray-600">Next pickup moved to 2:30 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav activeTab="home" />
    </div>
  )
}
