"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, PlusCircle } from "lucide-react"
import type { Chapter, Course } from "@prisma/client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ChaptersList } from "./chapters-list"

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] }
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1),
})

export function ChaptersForm({
  initialData,
  courseId,
}: ChaptersFormProps) {
  const router = useRouter()

  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast.success("챕터가 등록되었습니다.")
      toggleCreating()
      router.refresh()
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`)
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true)

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      })
      toast.success("챕터 순서가 변경되었습니다.")
      router.refresh()
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
    finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        챕터
        <Button
          variant="ghost"
          onClick={toggleCreating}
        >
          {isCreating ? (
            <span>취소</span>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>추가</span>
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full"
            >
              등록
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic",
          )}
        >
          {!initialData.chapters.length && "챕터 없음"}
          <ChaptersList
            items={initialData.chapters || []}
            onEdit={onEdit}
            onReorder={onReorder}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          드래그 & 드랍으로 챕터 순서를 변경할 수 있습니다.
        </p>
      )}
    </div>
  )
}
