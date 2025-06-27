"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Truck, Clock, Layers, Maximize } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function MapView() {
  const [selectedLocation, setSelectedLocation] = useState("gate-a2")

  const locations = [
    { id: "gate-a2", name: "Gate A2", type: "entry", status: "assigned", queue: 12 },
    { id: "gate-b1", name: "Gate B1", type: "entry", status: "open", queue: 8 },
    { id: "gate-c3", name: "Gate C3", type: "entry", status: "busy", queue: 25 },
    { id: "holding-1", name: "Holding Zone 1", type: "holding", status: "available", capacity: "15/30" },
    { id: "holding-2", name: "Holding Zone 2", type: "holding", status: "full", capacity: "30/30" },
    { id: "bay-15", name: "Bay 15", type: "pickup", status: "assigned", container: "MSKU-7834521" },
    { id: "bay-22", name: "Bay 22", type: "pickup", status: "available", container: null },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800"
      case "open":
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "full":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "entry":
        return "🚪"
      case "holding":
        return "🅿️"
      case "pickup":
        return "📦"
      default:
        return "📍"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Port Map</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white">
              <Layers className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <p className="text-blue-100 text-sm mt-1">Real-time port layout and navigation</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Map Container - Simulated */}
        <Card className="h-64 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Interactive Port Map</p>
              <p className="text-xs text-gray-500">Real-time location tracking</p>
            </div>
          </div>

          {/* Simulated map markers */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-6 w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="absolute bottom-6 left-8 w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-red-500 rounded-full"></div>
        </Card>

        {/* Current Route */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Current Route
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Your Location</p>
                  <p className="text-sm text-gray-600">En route to Gate A2</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <Clock className="w-3 h-3 mr-1" />8 min
              </Badge>
            </div>

            <div className="pl-11 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Gate A2 Entry</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-sm">Holding Zone 1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-sm">Bay 15 (Final)</span>
              </div>
            </div>

            <Button className="w-full mt-3">
              <Navigation className="w-4 h-4 mr-2" />
              Start Navigation
            </Button>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Port Locations</CardTitle>
            <CardDescription>Tap any location for details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedLocation === location.id ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                }`}
                onClick={() => setSelectedLocation(location.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getLocationIcon(location.type)}</span>
                    <div>
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{location.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(location.status)}>{location.status}</Badge>
                    {location.queue && <p className="text-xs text-gray-600 mt-1">{location.queue} min queue</p>}
                    {location.capacity && <p className="text-xs text-gray-600 mt-1">{location.capacity}</p>}
                    {location.container && <p className="text-xs text-gray-600 mt-1">{location.container}</p>}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Map Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Your Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Full/Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav activeTab="map" />
    </div>
  )
}
