"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Settings, Moon, Sun, Bell, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [language, setLanguage] = useState("ar")
  const [siteTitle, setSiteTitle] = useState("الأمانة العامة لخدمة الشباب")
  const [supportEmail, setSupportEmail] = useState("info@khedma.org")

  const handleExportData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      title: siteTitle,
      supportEmail,
      settings: {
        darkMode,
        notifications,
        emailNotifications,
        language,
      },
    }

    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "site-settings.json"
    a.click()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:to-slate-900">
      <Header onLoginClick={() => {}} onLogout={() => {}} userRole={null} />

      {/* Page Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
            <Settings className="w-10 h-10" />
            الإعدادات
          </h1>
          <p className="text-foreground/70">إدارة إعدادات الموقع والتفضيلات</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Site Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-3">إعدادات الموقع</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">اسم الموقع</label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">بريد الدعم الفني</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">اللغة</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                >
                  <option value="ar">العربية</option>
                  <option value="en">الإنجليزية</option>
                </select>
              </div>
              <Button className="bg-primary hover:bg-primary/90">حفظ الإعدادات</Button>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-accent">
            <h2 className="text-2xl font-bold text-accent mb-6 border-b border-border pb-3">مظهر الموقع</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-6 h-6 text-accent" /> : <Sun className="w-6 h-6 text-accent" />}
                  <div>
                    <p className="font-semibold text-foreground">الوضع الليلي</p>
                    <p className="text-sm text-foreground/60">تفعيل الوضع الليلي للحفاظ على العينين</p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-14 h-8 rounded-full transition ${darkMode ? "bg-accent" : "bg-gray-300"}`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      darkMode ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-3">الإشعارات</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">إشعارات الموقع</p>
                    <p className="text-sm text-foreground/60">تفعيل الإشعارات على الموقع</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-14 h-8 rounded-full transition ${
                    notifications ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      notifications ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">إشعارات البريد الإلكتروني</p>
                    <p className="text-sm text-foreground/60">استقبال الإشعارات عبر البريد الإلكتروني</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-14 h-8 rounded-full transition ${
                    emailNotifications ? "bg-accent" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      emailNotifications ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-accent">
            <h2 className="text-2xl font-bold text-accent mb-6 border-b border-border pb-3">إدارة البيانات</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
                <p className="font-semibold text-foreground mb-3">تصدير الإعدادات</p>
                <p className="text-sm text-foreground/60 mb-4">قم بتصدير جميع إعدادات الموقع إلى ملف JSON</p>
                <Button onClick={handleExportData} className="bg-accent hover:bg-accent/90">
                  <Download className="w-4 h-4" />
                  تصدير الإعدادات
                </Button>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-700 dark:text-red-400 mb-2">منطقة الخطر</p>
                <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                  حذف جميع البيانات قد يؤدي إلى فقدان المعلومات بشكل دائم
                </p>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
                  حذف البيانات
                </Button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-primary text-center">
            <h2 className="text-2xl font-bold text-primary mb-3">عن الموقع</h2>
            <p className="text-foreground/70 mb-2">الأمانة العامة لخدمة الشباب</p>
            <p className="text-sm text-foreground/60">الإصدار 1.0.0 • تم الإنشاء بـ Next.js و Tailwind CSS</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
