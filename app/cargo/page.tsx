"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Container,
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  Package,
  Truck,
  MapPin,
  Clock,
  Weight,
} from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function CargoInfo() {
  const [activeContainer, setActiveContainer] = useState("MSKU-7834521")

  const containers = [
    {
      id: "MSKU-7834521",
      status: "ready",
      weight: "24,500 kg",
      destination: "Los Angeles, CA",
      pickup_time: "14:30 Today",
      bay: "Bay 15",
      documents: ["Bill of Lading", "Customs Declaration", "Delivery Receipt"],
      contents: "Electronics & Components",
      special_instructions: "Handle with care - fragile items",
    },
    {
      id: "TCLU-9876543",
      status: "processing",
      weight: "18,200 kg",
      destination: "Phoenix, AZ",
      pickup_time: "16:45 Today",
      bay: "Bay 22",
      documents: ["Bill of Lading", "Hazmat Certificate"],
      contents: "Industrial Chemicals",
      special_instructions: "Hazmat certified driver required",
    },
  ]

  const currentContainer = containers.find((c) => c.id === activeContainer) || containers[0]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="w-4 h-4" />
      case "processing":
        return <Clock className="w-4 h-4" />
      case "delayed":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Cargo Information</h1>
        <p className="text-blue-100 text-sm mt-1">Container details and documentation</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Container Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Your Containers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {containers.map((container) => (
              <div
                key={container.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  activeContainer === container.id ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                }`}
                onClick={() => setActiveContainer(container.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Container className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{container.id}</p>
                      <p className="text-sm text-gray-600">{container.pickup_time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(container.status)}>
                    {getStatusIcon(container.status)}
                    <span className="ml-1 capitalize">{container.status}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Container Details */}
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Container className="h-5 w-5" />
                  {currentContainer.id}
                </CardTitle>
                <CardDescription>Container specifications and contents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="font-medium">{currentContainer.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Destination</p>
                        <p className="font-medium">{currentContainer.destination}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Pickup Time</p>
                        <p className="font-medium">{currentContainer.pickup_time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Pickup Bay</p>
                        <p className="font-medium">{currentContainer.bay}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Contents</p>
                  <p className="font-medium">{currentContainer.contents}</p>
                </div>

                {currentContainer.special_instructions && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Special Instructions</p>
                        <p className="text-sm text-yellow-700">{currentContainer.special_instructions}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Required Documents
                </CardTitle>
                <CardDescription>Download and prepare these documents for pickup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentContainer.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc}</p>
                        <p className="text-sm text-gray-600">Required for pickup</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}

                <div className="pt-4">
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download All Documents
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Document Checklist</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Ensure all documents are printed and readily available before arriving at the port. Digital copies
                      on your mobile device are also recommended as backup.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Container Journey</CardTitle>
                <CardDescription>Real-time tracking and status updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Container Ready for Pickup</p>
                      <p className="text-sm text-gray-600">Today, 13:45 - Bay 15</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Customs Clearance Complete</p>
                      <p className="text-sm text-gray-600">Today, 11:30</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Container Unloaded</p>
                      <p className="text-sm text-gray-600">Yesterday, 16:20</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-600">Vessel Arrived</p>
                      <p className="text-sm text-gray-600">Yesterday, 08:15</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav activeTab="cargo" />
    </div>
  )
}
