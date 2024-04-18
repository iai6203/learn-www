import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { CheckCircle, Clock } from "lucide-react"

import { CoursesList } from "@/components/courses-list"
import { getDashboardCourses } from "@/actions/get-dashboard-courses"

import { InfoCard } from "./_components/info-card"

export default async function Dashboard() {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const {
    completedCourses,
    coursesInProgress,
  } = await getDashboardCourses(userId)

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="수강 중"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          variant="success"
          icon={CheckCircle}
          label="완료"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
