import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "لوحة تحكم - أب كاهن",
}

export default function PriestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
