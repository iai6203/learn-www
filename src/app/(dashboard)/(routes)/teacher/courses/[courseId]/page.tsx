import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react"

import { Banner } from "@/components/banner"
import { IconBadge } from "@/components/icon-badge"

import { TitleForm } from "./_components/title-form"
import { DescriptionForm } from "./_components/description-form"
import { ImageForm } from "./_components/image-form"
import { CategoryForm } from "./_components/category-form"
import { ChaptersForm } from "./_components/chapters-form"
import { PriceForm } from "./_components/price-form"
import { AttachmentForm } from "./_components/attachment-form"
import { Actions } from "./_components/actions"
import { db } from "@/lib/db"

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
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    }
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
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
    course.chapters.some((chapter) => chapter.isPublished),
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="해당 강좌는 공개되지 않았습니다. (학생에게 표시되지 않습니다.)"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">강좌 설정</h1>
            <span className="text-sm text-slate-700">
              모든 항목을 입력해주세요. {completionText}
            </span>
          </div>
          <Actions
            courseId={params.courseId}
            isPublished={course.isPublished}
            disabled={!isComplete}
          />
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
            <DescriptionForm
              initialData={course}
              courseId={course.id}
            />
            <ImageForm
              initialData={course}
              courseId={course.id}
            />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">강의 챕터</h2>
              </div>
              <div>
                <ChaptersForm
                  initialData={course}
                  courseId={course.id}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">강좌 결제 정보</h2>
              </div>

              <PriceForm
                initialData={course}
                courseId={course.id}
              />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File}/>
                <h2 className="text-xl">첨부 파일</h2>
              </div>

              <AttachmentForm
                initialData={course}
                courseId={course.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
