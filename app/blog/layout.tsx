import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "الأخبار والمدونة",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
