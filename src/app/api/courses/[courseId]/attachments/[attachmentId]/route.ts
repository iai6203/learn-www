import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
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
      }
    })

    if (!courseOwner) {
      return new NextResponse("권한 없음", { status: 401 })
    }

    const attachment = await db.attachment.delete({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      }
    })

    return NextResponse.json(attachment)
  }
  catch (error) {
    console.log("[ATTACHMENT_ID]", error)

    return new NextResponse(("알 수 없는 오류"), { status: 500 })
  }
}
