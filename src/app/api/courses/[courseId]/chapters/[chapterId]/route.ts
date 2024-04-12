import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string} },
) {
  try {
    const { userId } = auth()
    const { isPublished, ...values } = await req.json()

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

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      }
    })

    // TODO: 비디오 업로드

    return NextResponse.json(chapter)
  }
  catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error)

    return new NextResponse("알 수 없는 오류", { status: 500 })
  }
}
