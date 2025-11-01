import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "الإحصائيات",
}

export default function StatisticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
