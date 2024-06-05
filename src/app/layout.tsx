import type { Metadata } from "next"
import localFont from "next/font/local"
import { ClerkProvider } from "@clerk/nextjs"
import { koKR } from "@clerk/localizations"

import { Toaster } from "@/components/ui/sonner"
import { ConfettiProvider } from "@/components/providers/confetti-provider"

import "./globals.css"

const pretendardFont = localFont({
  src: [
    {
      path: "../fonts/pretendard/PretendardVariable.woff2",
      weight: "45 920",
    }
  ],
})

export const metadata: Metadata = {
  title: "재프런",
  description: "프로그래밍, 인공지능, 데이터, 마케팅, 디자인, 엑셀 실무 등 입문부터 실전까지 업계 최고 선배들에게 배울 수 있는 곳. 우리는 성장 기회의 평등을 추구합니다.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="en">
        <body className={pretendardFont.className}>
          {children}
          <ConfettiProvider />
          <Toaster
            position="top-center"
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
