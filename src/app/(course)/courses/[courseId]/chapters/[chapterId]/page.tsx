import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { Banner } from "@/components/banner"
import { getChapter } from "@/actions/get-chapter"

import { VideoPlayer } from "./_components/video-player"

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const {
    course,
    chapter,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  })

  if (!course || !chapter) {
    return redirect("/")
  }

  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="이미 해당 챕터를 수강하였습니다."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="해당 챕터를 수강하기 위해서는 강좌를 구매해야합니다."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            title={chapter.title}
            courseId={params.courseId}
            chapterId={params.chapterId}
            playbackId={muxData?.playbackId!}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </div>
    </div>
  )
}
