"use client"

import React from "react"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Compass,
  Layout,
  List,
} from "lucide-react"

import { SidebarItem } from "./sidebar-item"

const guestRoutes = [
  {
    label: "대시보드",
    href: "/",
    icon: Layout,
  },
  {
    label: "탐색",
    href: "/search",
    icon: Compass,
  },
]

const teacherRoutes = [
  {
    label: "강좌",
    href: "/teacher/courses",
    icon: List,
  },
  {
    label: "통계",
    href: "/teacher/analytics",
    icon: BarChart,
  },
]

export function SidebarRoutes() {
  const pathname = usePathname()

  const isTeacherPage = pathname?.includes("/teacher")

  const routes = isTeacherPage ? teacherRoutes : guestRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
        />
      ))}
    </div>
  )
}
