"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

export function NavbarRoutes() {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/teacher")
  const isPlayerPage = pathname?.includes("/chapter")

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <LogOut className="h-4 w-4 mr-2" />
            <span>나가기</span>
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" size="sm" asChild>
          <Link href="/teacher/courses">
            강사 모드
          </Link>
        </Button>
      )}
      <UserButton
        afterSignOutUrl="/"
      />
    </div>
  )
}
