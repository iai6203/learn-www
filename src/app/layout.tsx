import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { koKR } from "@clerk/localizations"

import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={koKR}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster
            position="top-center"
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
