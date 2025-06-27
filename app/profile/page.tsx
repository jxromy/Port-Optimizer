"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { User, Truck, Bell, Settings, Phone, Mail, Clock, Shield, Smartphone, MessageSquare } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function Profile() {
  const [notifications, setNotifications] = useState({
    push: true,
    sms: false,
    email: true,
    schedule_changes: true,
    traffic_alerts: true,
    port_updates: true,
  })

  const [profile, setProfile] = useState({
    name: "John Martinez",
    phone: "+1 (555) 123-4567",
    email: "john.martinez@trucking.com",
    license: "CDL-A-123456789",
    company: "Martinez Logistics",
    truck_id: "TRK-001",
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Profile & Settings</h1>
        <p className="text-blue-100 text-sm mt-1">Manage your account and preferences</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Driver Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-sm text-gray-600">{profile.company}</p>
                <Badge variant="secondary" className="mt-1">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified Driver
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="name" className="text-sm">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license" className="text-sm">
                    License Number
                  </Label>
                  <Input
                    id="license"
                    value={profile.license}
                    onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="truck" className="text-sm">
                    Truck ID
                  </Label>
                  <Input
                    id="truck"
                    value={profile.truck_id}
                    onChange={(e) => setProfile({ ...profile, truck_id: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Working Hours
            </CardTitle>
            <CardDescription>Set your default availability for trip optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time" className="text-sm">
                  Start Time
                </Label>
                <Input id="start-time" type="time" defaultValue="06:00" />
              </div>
              <div>
                <Label htmlFor="end-time" className="text-sm">
                  End Time
                </Label>
                <Input id="end-time" type="time" defaultValue="18:00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Working Days</Label>
              <div className="flex gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <Button key={day} variant={day !== "Sun" ? "default" : "outline"} size="sm" className="flex-1">
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you want to receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Instant alerts on your device</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Text messages to your phone</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Updates sent to your email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="font-medium mb-3">Notification Types</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Schedule Changes</span>
                  <Switch
                    checked={notifications.schedule_changes}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, schedule_changes: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Traffic Alerts</span>
                  <Switch
                    checked={notifications.traffic_alerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, traffic_alerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Port Updates</span>
                  <Switch
                    checked={notifications.port_updates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, port_updates: checked })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Truck className="w-4 h-4 mr-2" />
              Vehicle Settings
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="w-4 h-4 mr-2" />
              Privacy & Security
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Phone className="w-4 h-4 mr-2" />
              Support & Help
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="bg-gray-50">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-gray-600">Port Optimizer v2.1.0</p>
            <p className="text-xs text-gray-500 mt-1">© 2024 Smart Port Solutions</p>
          </CardContent>
        </Card>
      </div>

      <BottomNav activeTab="profile" />
    </div>
  )
}
