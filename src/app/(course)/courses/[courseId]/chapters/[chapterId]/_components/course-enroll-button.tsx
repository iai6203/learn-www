"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"

interface ChapterEnrollButtonProps {
  courseId: string
  price: number
}

export function CourseEnrollButton({
  courseId,
  price,
}: ChapterEnrollButtonProps) {
  return (
    <Button
      size="sm"
      className="w-full md:w-auto"
    >
      결제 ({formatPrice(price)})
    </Button>
  )
}
