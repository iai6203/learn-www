"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { z } from "zod"
import { toast } from "sonner"
import MuxPlayer from "@mux/mux-player-react"
import { Pencil, PlusCircle, Video } from "lucide-react"
import type { Chapter, MuxData } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null }
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
})

export function ChapterVideoForm({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("챕터가 수정되었습니다.")
      toggleEdit()
      router.refresh()
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        영상
        <Button
          variant="ghost"
          onClick={toggleEdit}
        >
          {isEditing && (
            <span>취소</span>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>추가</span>
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <span>수정</span>
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-600" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            해당 챕터 영상을 업로드해주세요.
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          영상이 나타나는데 시간이 소요될 수 있습니다.
          <br />
          영상이 장시간 나타나지 않을 경우 새로고침해주세요.
        </div>
      )}
    </div>
  )
}
