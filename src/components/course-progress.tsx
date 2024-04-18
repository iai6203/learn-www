import React from "react"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface CourseProgressProps {
  variant?: "default" | "success"
  value: number
  size?: "default" | "sm"
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
}

export function CourseProgress({
  variant,
  value,
  size,
}: CourseProgressProps) {

  return (
    <div>
      <Progress
        variant={variant}
        value={value}
        className="h-2"
      />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "sm"],
        )}
      >
        {Math.round(value)}% 진행 중
      </p>
    </div>
  )
}
