"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  title: z.string().min(1, {
    message: "강좌명은 필수 사항입니다.",
  })
})

export default function CourseCreatePage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values)
      router.push(`/teacher/courses/${response.data.id}`)
      toast.success("새로운 강좌가 개설되었습니다.")
    }
    catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">강좌명을 정해주세요.</h1>
        <p className="text-sm text-slate-600">
          강좌명을 무엇으로 하고 싶으신가요? 걱정하지 마세요. 추후에 수정할 수 있습니다.
        </p>
        <Form {...form}>
          <form
            className="mt-8 space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>강좌명</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    이 강좌에서 무엇을 가르치나요?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
                <Button
                  variant="ghost"
                  type="button"
                  asChild
                >
                  <Link href="">
                    취소
                  </Link>
                </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                계속하기
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
