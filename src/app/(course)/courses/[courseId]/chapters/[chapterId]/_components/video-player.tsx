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
  const [isReady, setIsReady] = useState(false)

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
          onEnded={() => {}}
        />
      )}
    </div>
  )
}
