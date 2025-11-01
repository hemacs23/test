"use client"

import { useState } from "react"
import Header from "@/components/header"
import LoginModal from "@/components/login-modal"
import FamiliesList from "@/components/families-list"
import NewsSection from "@/components/news-section"
import DailyReflection from "@/components/daily-reflection"
import Footer from "@/components/footer"
import { Users, BookOpen, Calendar, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const [userRole, setUserRole] = useState<"member" | "priest" | "admin" | null>(null)
  const [userToken, setUserToken] = useState<string | null>(null)

  const handleLogin = (role: "member" | "priest" | "admin", token: string) => {
    setUserRole(role)
    setUserToken(token)
    setShowLogin(false)
    localStorage.setItem("userRole", role)
    localStorage.setItem("userToken", token)
  }

  const handleLogout = () => {
    setUserRole(null)
    setUserToken(null)
    localStorage.removeItem("userRole")
    localStorage.removeItem("userToken")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-blue-50 dark:to-slate-900">
      <Header onLoginClick={() => setShowLogin(true)} onLogout={handleLogout} userRole={userRole} />

      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}

      {/* Hero Section */}
      <section className="py-12 px-4 text-center bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
        <div className="max-w-6xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">الأمانة العامة لخدمة الشباب</h1>
          <p className="text-base md:text-lg text-foreground/70">برعاية نيافة الحبر الجليل الأنبا أغاثون</p>
          <p className="text-lg md:text-xl font-semibold text-accent">
            ربط أسر المغتربين في كل مكان بالخدمة والكنيسة الأم
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-4 bg-white dark:bg-slate-800 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link
              href="/families"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              <Users className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-center">الأسر</span>
            </Link>
            <Link
              href="/blog"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              <BookOpen className="w-6 h-6 text-accent" />
              <span className="text-sm font-semibold text-center">الأخبار</span>
            </Link>
            <Link
              href="/events"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              <Calendar className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-center">الفعاليات</span>
            </Link>
            <Link
              href="/statistics"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              <BarChart3 className="w-6 h-6 text-accent" />
              <span className="text-sm font-semibold text-center">الإحصائيات</span>
            </Link>
            <Link
              href="/settings"
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              <Settings className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-center">الإعدادات</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <FamiliesList userRole={userRole} userToken={userToken} />
            <NewsSection userRole={userRole} userToken={userToken} />
          </div>
          <aside className="space-y-6">
            <DailyReflection userRole={userRole} />
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}
