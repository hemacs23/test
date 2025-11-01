import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "الإعدادات",
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
