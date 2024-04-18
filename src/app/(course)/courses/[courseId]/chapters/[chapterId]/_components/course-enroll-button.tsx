"use client"

import React, { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

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
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign(response.data.url)
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      disabled={isLoading}
      className="w-full md:w-auto"
      onClick={onClick}
    >
      결제 ({formatPrice(price)})
    </Button>
  )
}
