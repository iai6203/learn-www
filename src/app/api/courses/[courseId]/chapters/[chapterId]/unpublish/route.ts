import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("권한 없음", { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!courseOwner) {
      return new NextResponse("권한 없음", { status: 401 })
    }

    const unpublishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    })

    const publishedChapterInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    })

    if (!publishedChapterInCourse.length) {
      await db.course.update({
        where: { id: params.courseId },
        data: { isPublished: false },
      })
    }

    return NextResponse.json(unpublishedChapter)
  }
  catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error)

    return new NextResponse("알 수 없는 오류", { status: 500 })
  }
}
