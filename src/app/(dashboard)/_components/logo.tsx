import React from "react"
import Image from "next/image"

export function Logo() {
  return (
    <Image
      width={30}
      height={30}
      alt="Logo"
      src="/logo.svg"
    />
  )
}
