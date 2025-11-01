import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "الأسر",
}

export default function FamiliesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
