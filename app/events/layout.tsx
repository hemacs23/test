import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "الفعاليات والتقويم",
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
