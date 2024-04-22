import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth()
    const { title } = await req.json()

    if (!userId) {
      return new NextResponse("권한 없음", { status: 401 })
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    })

    revalidatePath("/teacher/courses")

    return NextResponse.json(course)
  }
  catch (error) {
    console.log("[COURSES]", error)

    return new NextResponse("알 수 없는 오류", { status : 500 })
  }
}
