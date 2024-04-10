import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { LayoutDashboard } from "lucide-react"

import { db } from "@/lib/db"
import { IconBadge } from "@/components/icon-badge"

import { TitleForm } from "./_components/title-form"

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string
  }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: { id: params.courseId },
  })

  if (!course) {
    return redirect("/")
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">강좌 설정</h1>
          <span className="text-sm text-slate-700">모든 항목을 입력해주세요. {completionText}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">강좌를 수정하세요.</h2>
          </div>
          <TitleForm
            initialData={course}
            courseId={course.id}
          />
        </div>
      </div>
    </div>
  )
}
