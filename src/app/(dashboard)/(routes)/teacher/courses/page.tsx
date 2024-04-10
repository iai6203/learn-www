import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  return (
    <div className="p-6">
      <Button asChild>
        <Link href="/teacher/create">
          새로운 강좌
        </Link>
      </Button>
    </div>
  );
}
