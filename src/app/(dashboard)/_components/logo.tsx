import React from "react"
import Image from "next/image"

export function Logo() {
  return (
    <Image
      width={100}
      height={23.25}
      alt="Logo"
      src="/logo.svg"
    />
  )
}
