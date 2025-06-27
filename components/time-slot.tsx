"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

interface TimeSlotProps {
  time: string
  status: "optimal" | "good" | "busy" | "assigned" | "available" | "peak"
  congestion: number
  queue: number
  isSelected: boolean
  onSelect: () => void
}

export function TimeSlot({ time, status, congestion, queue, isSelected, onSelect }: TimeSlotProps) {
  const getStatusColor = () => {
    switch (status) {
      case "optimal":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "assigned":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "available":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "busy":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "peak":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case "optimal":
        return "Optimal"
      case "good":
        return "Good"
      case "assigned":
        return "Assigned"
      case "available":
        return "Available"
      case "busy":
        return "Busy"
      case "peak":
        return "Peak Hours"
      default:
        return status
    }
  }

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-blue-500 border-blue-300" : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-semibold text-lg">{time}</p>
            <p className="text-sm text-gray-600">Pickup time</p>
          </div>
        </div>
        <div className="text-right">
          <Badge className={getStatusColor()}>{getStatusLabel()}</Badge>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{queue}min</span>
            </div>
            <div>
              <span>{congestion}% busy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
