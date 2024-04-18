import React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { AlertTriangle, CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        success: "bg-emerald-700 border-emerald-800 text-secondary",
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string
}

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
}

export function Banner({
  label,
  variant,
}: BannerProps) {
  const Icon = iconMap[variant || "warning"]

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  )
}
