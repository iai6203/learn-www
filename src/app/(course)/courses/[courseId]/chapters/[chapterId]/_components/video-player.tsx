"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import MuxPlayer from "@mux/mux-player-react"
import { toast } from "sonner"
import { Loader2, Lock } from "lucide-react";

import { useConfettiStore } from "@/hooks/use-confetti-store"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  title: string
  courseId: string
  chapterId: string
  playbackId: string
  nextChapterId?: string
  isLocked: boolean
  completeOnEnd: boolean
}

export function VideoPlayer({
  title,
  courseId,
  chapterId,
  playbackId,
  nextChapterId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) {
  const router = useRouter()
  const confetti = useConfettiStore()

  const [isReady, setIsReady] = useState(false)

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        })

        if (!nextChapterId) {
          confetti.onOpen()
        }

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }

        toast.success("챕터 진행 상황이 저장되었습니다.")
        router.refresh()
      }
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            해당 챕터를 이용하실 수 없습니다.
          </p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          playbackId={playbackId}
          autoPlay
          className={cn(
            !isReady && "hidden",
          )}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
        />
      )}
    </div>
  )
}
