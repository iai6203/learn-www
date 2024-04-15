import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("권한 없음", { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!course) {
      return new NextResponse("항목을 찾을 수 없음", { status: 404 })
    }

    const unpublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    })

    return NextResponse.json(unpublishedCourse)
  }
  catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error)

    return new NextResponse("알 수 없는 오류", { status: 500 })
  }
}
