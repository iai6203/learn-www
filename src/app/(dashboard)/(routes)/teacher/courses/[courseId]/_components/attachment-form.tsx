"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { z } from "zod"
import { toast } from "sonner"
import { File, Loader2, PlusCircle, X } from "lucide-react"
import type { Course, Attachment } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1),
})

export function AttachmentForm({
  initialData,
  courseId,
}: AttachmentFormProps) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success("첨부 파일이 등록되었습니다.")
      toggleEdit()
      router.refresh()
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success("첨부 파일이 삭제되었습니다.")
      router.refresh()
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
    finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        첨부 파일
        <Button
          variant="ghost"
          onClick={toggleEdit}
        >
          {isEditing && (
            <span>취소</span>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>추가</span>
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              첨부 파일 없음
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            강의한 필요한 자료를 업로드 해주세요.
          </div>
        </div>
      )}
    </div>
  )
}
