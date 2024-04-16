"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"

export function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value)

  const currentCategoryId = searchParams.get("categoryId")

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
      },
    }, {
      skipNull: true,
      skipEmptyString: true,
    })

    router.push(url)
  }, [pathname, router, debouncedValue, currentCategoryId]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        placeholder="강좌 검색"
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  )
}
