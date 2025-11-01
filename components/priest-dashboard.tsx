"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Users, Bell, Download, Plus } from "lucide-react"

export default function PriestDashboard() {
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState("family")
  const [familyName] = useState("أسرة القاهرة")
  const [members, setMembers] = useState([
    {
      id: "1",
      name: "أحمد علي",
      age: 22,
      college: "هندسة",
      city: "القاهرة",
      phone: "0123456789",
      address: "شارع النيل",
      birthDate: "2002-05-15",
    },
    {
      id: "2",
      name: "فاطمة محمود",
      age: 20,
      college: "طب",
      city: "القاهرة",
      phone: "0198765432",
      address: "شارع التحرير",
      birthDate: "2004-08-22",
    },
  ])
  const [showAddMember, setShowAddMember] = useState(false)

  const handleExportCSV = () => {
    const headers = ["الاسم", "العمر", "الكلية", "المدينة", "الهاتف", "العنوان", "تاريخ الميلاد"]
    const rows = members.map((m) => [m.name, m.age, m.college, m.city, m.phone, m.address, m.birthDate])

    let csv = headers.join(",") + "\n"
    rows.forEach((row) => {
      csv += row.join(",") + "\n"
    })

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${familyName}-members.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{familyName}</h1>
          <Button onClick={logout} className="bg-white/20 hover:bg-white/30 text-white">
            <LogOut className="w-4 h-4" />
            تسجيل خروج
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("family")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === "family"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            الأعضاء ({members.length})
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === "notifications"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            الإشعارات
          </button>
        </div>

        {/* Family Tab */}
        {activeTab === "family" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">أعضاء الأسرة</h2>
              <div className="flex gap-2">
                <Button onClick={handleExportCSV} className="bg-accent hover:bg-accent/90">
                  <Download className="w-4 h-4" />
                  تصدير CSV
                </Button>
                <Button onClick={() => setShowAddMember(!showAddMember)} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                  إضافة عضو
                </Button>
              </div>
            </div>

            {showAddMember && (
              <div className="bg-blue-50 dark:bg-slate-800 rounded-xl p-6 border-2 border-primary">
                <h3 className="text-lg font-bold text-primary mb-4">إضافة عضو جديد</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="number"
                    placeholder="العمر"
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="الكلية / الجامعة"
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="المدينة"
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="tel"
                    placeholder="رقم الموبايل"
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="date"
                    placeholder="تاريخ الميلاد"
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <textarea
                    placeholder="العنوان بالتفصيل"
                    rows={2}
                    className="col-span-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="bg-primary hover:bg-primary/90">إضافة</Button>
                  <Button onClick={() => setShowAddMember(false)} variant="outline">
                    إلغاء
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border-r-4 border-primary"
                >
                  <h3 className="text-lg font-bold text-foreground mb-3">{member.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-foreground/60">العمر:</span> {member.age} سنة
                    </p>
                    <p>
                      <span className="text-foreground/60">الكلية:</span> {member.college}
                    </p>
                    <p>
                      <span className="text-foreground/60">المدينة:</span> {member.city}
                    </p>
                    <p>
                      <span className="text-foreground/60">الهاتف:</span> {member.phone}
                    </p>
                    <p>
                      <span className="text-foreground/60">العنوان:</span> {member.address}
                    </p>
                    <p>
                      <span className="text-foreground/60">تاريخ الميلاد:</span> {member.birthDate}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      تعديل
                    </Button>
                    <Button size="sm" variant="outline">
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">إرسال إشعار</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
              <input
                type="text"
                placeholder="عنوان الإشعار"
                className="w-full px-4 py-3 mb-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
              />
              <textarea
                placeholder="محتوى الإشعار"
                rows={5}
                className="w-full px-4 py-3 mb-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
              />
              <Button className="bg-primary hover:bg-primary/90">إرسال إشعار</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
