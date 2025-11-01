import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "لوحة التحكم - مسؤول",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
