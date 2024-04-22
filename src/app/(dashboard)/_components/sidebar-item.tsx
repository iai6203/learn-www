"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface SidebarItemProps {
  label: string
  href: string
  icon: LucideIcon
}

export function SidebarItem({
  label,
  href,
  icon: Icon,
}: SidebarItemProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`)

  const handleClick = () => {
    router.push(href)
  }

  return (
    <button
      type="button"
      className={cn(
        "px-4 flex items-center gap-x-2 text-[#8a94a6] text-sm font-[500] rounded-md transition-all hover:text-white hover:bg-white/[0.04]",
        isActive && "text-white bg-[#635BFF] hover:bg-[#635BFF] hover:text-white",
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-x-3 py-3">
        <Icon size={16} />
        {label}
      </div>
    </button>
  );
}
