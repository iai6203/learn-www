"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"
import { useConfettiStore } from "@/hooks/use-confetti-store"

interface ActionsProps {
  courseId: string
  isPublished: boolean
  disabled: boolean
}

export function Actions({
  courseId,
  isPublished,
  disabled,
}: ActionsProps) {
  const router = useRouter()
  const confetti = useConfettiStore()

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success("강좌가 비공개되었습니다.")
      }
      else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("강좌가 공개되었습니다.")
        confetti.onOpen()
      }

      router.refresh()
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
    finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/courses/${courseId}`)
      toast.success("강좌가 삭제되었습니다.")
      router.push(`/teacher/courses`)
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
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isPublished ? "비공개" : "공개"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          size="sm"
          disabled={isLoading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
