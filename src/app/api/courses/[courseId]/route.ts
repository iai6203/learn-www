import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import Mux from "@mux/mux-node"

import { db } from "@/lib/db"

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()
    const { courseId } = params
    const values = await req.json()

    if (!userId) {
      return new NextResponse("권한 없음", { status: 401 })
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(course)
  }
  catch (error) {
    console.log("[COURSE_ID]", error)

    return new NextResponse("알 수 없는 오류", { status : 500 })
  }
}

export async function DELETE(
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
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    })

    if (!course) {
      return new NextResponse("항목을 찾을 수 없음", { status : 404 })
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await mux.video.assets.delete(chapter.muxData.assetId)
      }
    }

    const deletedCourse = await db.course.delete({
      where: { id: params.courseId },
    })

    return NextResponse.json(deletedCourse)
  }
  catch (error) {
    console.log("[COURSE_ID_DELETE]", error)

    return new NextResponse("알 수 없는 오류", { status : 500 })
  }
}
