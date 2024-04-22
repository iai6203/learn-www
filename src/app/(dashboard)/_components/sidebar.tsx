import React from "react"

import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export function Sidebar() {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-[#121621] shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="px-4 flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
