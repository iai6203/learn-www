import React from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { getAnalytics } from "@/actions/get-analytics"

import { DataCard } from "./_components/data-card"
import { Chart } from "./_components/chart"

export default async function AnalyticsPage() {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const {
    data,
    totalRevenue,
    totalSales,
  } = await getAnalytics(userId)

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="총 수익"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="총 판매 수"
          value={totalSales}
        />
      </div>
      <Chart data={data} />
    </div>
  )
}
