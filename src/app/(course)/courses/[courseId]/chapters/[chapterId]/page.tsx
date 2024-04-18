import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { File } from "lucide-react"

import { Banner } from "@/components/banner"
import { Preview } from "@/components/preview"
import { Separator } from "@/components/ui/separator"
import { getChapter } from "@/actions/get-chapter"

import { VideoPlayer } from "./_components/video-player"
import { CourseProgressButton } from "./_components/course-progress-button"
import { CourseEnrollButton } from "./_components/course-enroll-button"

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
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                courseId={params.courseId}
                chapterId={params.chapterId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
