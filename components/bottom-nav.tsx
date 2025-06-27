import Link from "next/link"
import { Home, Calendar, Map, Package, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
}

export function BottomNav({ activeTab }: BottomNavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "schedule", label: "Schedule", icon: Calendar, href: "/schedule" },
    { id: "map", label: "Map", icon: Map, href: "/map" },
    { id: "cargo", label: "Cargo", icon: Package, href: "/cargo" },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
