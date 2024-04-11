"use client"

import { toast } from "sonner"

import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthing"

interface FileUploadProps {
  endpoint: keyof typeof ourFileRouter
  onChange: (url: string) => void
}

export function FileUpload({
  endpoint,
  onChange,
}: FileUploadProps) {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message)
      }}
    />
  )
}
