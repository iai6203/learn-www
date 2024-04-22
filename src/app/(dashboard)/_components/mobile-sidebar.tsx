import React from "react"
import { Menu } from "lucide-react"

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet"

import { Sidebar } from "./sidebar"

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-none">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
