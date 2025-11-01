"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Plus, Users, Home, LogOut, Settings, BarChart3 } from "lucide-react"
import { useFirebaseData, writeData } from "@/lib/firebase-hooks"

export default function AdminDashboard() {
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const { data: adminsData, error: adminsError } = useFirebaseData<Record<string, any>>("admins")
  const {
    data: familiesData,
    loading: familiesLoading,
    error: familiesError,
  } = useFirebaseData<Record<string, any>>("families")
  const {
    data: membersData,
    loading: membersLoading,
    error: membersError,
  } = useFirebaseData<Record<string, any>>("members")

  const admins = adminsData ? Object.values(adminsData) : []
  const families = familiesData
    ? Object.entries(familiesData).map(([id, data]: [string, any]) => ({ id, ...data }))
    : []
  const membersCount = membersData ? Object.values(membersData).length : 0

  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [adminName, setAdminName] = useState("")
  const [adminCode, setAdminCode] = useState("")
  const [addingAdmin, setAddingAdmin] = useState(false)

  const [showAddFamily, setShowAddFamily] = useState(false)
  const [familyName, setFamilyName] = useState("")
  const [familyLocation, setFamilyLocation] = useState("")
  const [familyCode, setFamilyCode] = useState("")
  const [familyPriest, setFamilyPriest] = useState("")
  const [addingFamily, setAddingFamily] = useState(false)
  const [addMessage, setAddMessage] = useState("")

  const handleAddAdmin = async () => {
    if (!adminName.trim() || !adminCode.trim()) {
      setAddMessage("يرجى ملء جميع الحقول")
      return
    }

    setAddingAdmin(true)
    const newAdmin = {
      name: adminName,
      code: adminCode,
      createdAt: new Date().toISOString().split("T")[0],
    }

    const result = await writeData(`admins/${Date.now()}`, newAdmin)
    if (result.success) {
      setAdminName("")
      setAdminCode("")
      setShowAddAdmin(false)
      setAddMessage("تمت إضافة المسؤول بنجاح")
      setTimeout(() => setAddMessage(""), 3000)
    } else {
      setAddMessage(`خطأ: ${result.error}`)
    }
    setAddingAdmin(false)
  }

  const handleAddFamily = async () => {
    if (!familyName.trim() || !familyLocation.trim() || !familyCode.trim()) {
      setAddMessage("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    setAddingFamily(true)
    try {
      const newFamily = {
        name: familyName.trim(),
        location: familyLocation.trim(),
        code: familyCode.trim(),
        priest: familyPriest.trim() || "غير محدد",
        membersCount: 0,
        createdAt: new Date().toISOString(),
      }

      console.log("[v0] Adding new family:", newFamily)
      const result = await writeData(`families/${Date.now()}`, newFamily)

      if (result.success) {
        setFamilyName("")
        setFamilyLocation("")
        setFamilyCode("")
        setFamilyPriest("")
        setShowAddFamily(false)
        setAddMessage("✓ تمت إضافة الأسرة بنجاح")
        setTimeout(() => setAddMessage(""), 3000)
      } else {
        setAddMessage(`✗ خطأ: ${result.error}`)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "حدث خطأ غير متوقع"
      setAddMessage(`✗ خطأ: ${errorMsg}`)
      console.error("[v0] Add family error:", error)
    } finally {
      setAddingFamily(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">لوحة تحكم المسؤول</h1>
          <Button onClick={logout} className="bg-white/20 hover:bg-white/30 text-white">
            <LogOut className="w-4 h-4" />
            تسجيل خروج
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {addMessage && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg border border-blue-300 animate-in fade-in">
            {addMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            لمحة عامة
          </button>
          <button
            onClick={() => setActiveTab("admins")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === "admins"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            المسؤولون ({admins.length})
          </button>
          <button
            onClick={() => setActiveTab("families")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === "families"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <Home className="w-4 h-4 inline mr-2" />
            الأسر ({families.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === "settings"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            الإعدادات
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border-r-4 border-primary">
              <p className="text-sm text-foreground/60 mb-2">إجمالي الأسر</p>
              <p className="text-3xl font-bold text-primary">{familiesLoading ? "..." : families.length}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border-r-4 border-accent">
              <p className="text-sm text-foreground/60 mb-2">إجمالي الأعضاء</p>
              <p className="text-3xl font-bold text-accent">{membersLoading ? "..." : membersCount}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border-r-4 border-primary">
              <p className="text-sm text-foreground/60 mb-2">حالة النظام</p>
              <p className={`text-lg font-bold ${familiesError || membersError ? "text-red-500" : "text-green-500"}`}>
                {familiesError || membersError ? "✗ خطأ في الاتصال" : "✓ نشط"}
              </p>
            </div>
          </div>
        )}

        {/* Admins Tab */}
        {activeTab === "admins" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">المسؤولون الفرعيون</h2>
              <Button onClick={() => setShowAddAdmin(!showAddAdmin)} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                إضافة مسؤول
              </Button>
            </div>

            {showAddAdmin && (
              <div className="bg-blue-50 dark:bg-slate-800 rounded-xl p-6 border-2 border-primary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="اسم المسؤول"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="الكود"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddAdmin} disabled={addingAdmin} className="bg-primary hover:bg-primary/90">
                    {addingAdmin ? "جاري الإضافة..." : "إضافة"}
                  </Button>
                  <Button onClick={() => setShowAddAdmin(false)} variant="outline">
                    إلغاء
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {admins.map((admin: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border-r-4 border-primary">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{admin.name}</h3>
                      <p className="text-sm text-foreground/60">الكود: {admin.code}</p>
                      <p className="text-xs text-foreground/50">أنشئ في: {admin.createdAt}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Families Tab */}
        {activeTab === "families" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">الأسر</h2>
              <Button onClick={() => setShowAddFamily(!showAddFamily)} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                إضافة أسرة جديدة
              </Button>
            </div>

            {showAddFamily && (
              <div className="bg-blue-50 dark:bg-slate-800 rounded-xl p-6 border-2 border-primary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="اسم الأسرة"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="الموقع / المدينة"
                    value={familyLocation}
                    onChange={(e) => setFamilyLocation(e.target.value)}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="كود الأسرة"
                    value={familyCode}
                    onChange={(e) => setFamilyCode(e.target.value)}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="اسم الكاهن المسؤول"
                    value={familyPriest}
                    onChange={(e) => setFamilyPriest(e.target.value)}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddFamily} disabled={addingFamily} className="bg-primary hover:bg-primary/90">
                    {addingFamily ? "جاري الإضافة..." : "إضافة"}
                  </Button>
                  <Button onClick={() => setShowAddFamily(false)} variant="outline">
                    إلغاء
                  </Button>
                </div>
              </div>
            )}

            {familiesLoading ? (
              <div className="text-center py-8">
                <p className="text-foreground/60">جاري تحميل البيانات...</p>
              </div>
            ) : familiesError ? (
              <div className="text-center py-8">
                <p className="text-red-500">خطأ: {familiesError}</p>
              </div>
            ) : families.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-foreground/60">لا توجد أسر حتى الآن. أضف أسرة جديدة!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {families.map((family: any) => (
                  <div
                    key={family.id}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow border-r-4 border-accent"
                  >
                    <h3 className="text-lg font-bold text-primary mb-2">{family.name}</h3>
                    <p className="text-sm text-foreground/70 mb-2">الموقع: {family.location}</p>
                    <p className="text-sm text-foreground/70 mb-4">الكاهن: {family.priest}</p>
                    <p className="text-xs text-foreground/50">الكود: {family.code}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow">
            <h2 className="text-2xl font-bold text-primary mb-6">الإعدادات</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">اسم الموقع</label>
                <input
                  type="text"
                  defaultValue="الأمانة العامة لخدمة الشباب"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">البريد الإلكتروني للدعم</label>
                <input
                  type="email"
                  defaultValue="info@khedma.org"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">حفظ الإعدادات</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
