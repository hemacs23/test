"use client"
import { Button } from "@/components/ui/button"
import { Menu, LogOut } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface HeaderProps {
  onLoginClick: () => void
  onLogout: () => void
  userRole: "member" | "priest" | "admin" | null
}

export default function Header({ onLoginClick, onLogout, userRole }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getRoleLabel = (role: string | null) => {
    const labels: Record<string, string> = {
      admin: "مسؤول",
      priest: "أب كاهن",
      member: "عضو",
    }
    return labels[role || ""] || ""
  }

  const getDashboardLink = (role: string | null) => {
    const links: Record<string, string> = {
      admin: "/admin",
      priest: "/priest",
      member: "/",
    }
    return links[role || ""] || "/"
  }

  return (
    <header className="bg-gradient-to-r from-primary to-accent sticky top-0 z-50 shadow-lg border-b-4 border-accent/30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">✝️</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">خدمة الشباب</h1>
            <p className="text-xs md:text-sm text-blue-100">الأمانة العامة</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/families" className="text-white hover:text-blue-100 transition">
            الأسر
          </Link>
          <Link href="/blog" className="text-white hover:text-blue-100 transition">
            الأخبار
          </Link>
          <Link href="/events" className="text-white hover:text-blue-100 transition">
            الفعاليات
          </Link>
          <Link href="/about" className="text-white hover:text-blue-100 transition">
            عن الخدمة
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {userRole ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white bg-white/20 px-3 py-1 rounded-full">{getRoleLabel(userRole)}</span>
              <Link href={getDashboardLink(userRole)}>
                <Button className="bg-white/20 hover:bg-white/30 text-white">اللوحة</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={onLogout} className="text-white hover:bg-white/20">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={onLoginClick} className="bg-white text-primary hover:bg-blue-50">
              تسجيل الدخول
            </Button>
          )}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-primary/95 px-4 py-4 space-y-3">
          <Link href="/families" className="block text-white hover:text-blue-100">
            الأسر
          </Link>
          <Link href="/blog" className="block text-white hover:text-blue-100">
            الأخبار
          </Link>
          <Link href="/events" className="block text-white hover:text-blue-100">
            الفعاليات
          </Link>
          <Link href="/about" className="block text-white hover:text-blue-100">
            عن الخدمة
          </Link>
        </nav>
      )}
    </header>
  )
}
