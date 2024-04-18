"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useConfettiStore } from "@/hooks/use-confetti-store"

interface CourseProgressButtonProps {
  courseId: string
  chapterId: string
  nextChapterId?: string
  isCompleted?: boolean
}

export function CourseProgressButton({
  courseId,
  chapterId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) {
  const router = useRouter()
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState(false)

  const Icon = isCompleted ? XCircle : CheckCircle

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted,
      })

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen()
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }

      toast.success("챕터 진행 상황이 저장되었습니다.")
      router.refresh()
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
      variant={isCompleted ? "outline" : "success"}
      type="button"
      disabled={isLoading}
      className="w-full md:w-auto"
      onClick={onClick}
    >
      {isCompleted ? "챕터 미완료 처리" : "챕터 완료 처리"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  )
}
