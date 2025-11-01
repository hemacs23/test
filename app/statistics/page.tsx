"use client"

import type React from "react"
import Header from "@/components/header"
import { Users, Home, User, TrendingUp, PieChart, BarChart3 } from "lucide-react"
import Footer from "@/components/footer"

export default function StatisticsPage() {
  const stats = {
    totalFamilies: 15,
    totalMembers: 287,
    totalPriests: 8,
    totalAdmins: 3,
    maleMembers: 154,
    femaleMembers: 133,
    activeFamilies: 14,
    recentRegistrations: 28,
  }

  const familiesData = [
    { name: "أسرة القاهرة", members: 45, active: true },
    { name: "أسرة الإسكندرية", members: 38, active: true },
    { name: "أسرة الجيزة", members: 32, active: true },
    { name: "أسرة الفيوم", members: 28, active: true },
    { name: "أسرة بني سويف", members: 24, active: true },
    { name: "أسرة المنيا", members: 31, active: true },
    { name: "أسرة القريات", members: 18, active: false },
  ]

  const ageDistribution = [
    { range: "18-20", count: 78 },
    { range: "21-23", count: 92 },
    { range: "24-26", count: 85 },
    { range: "27+", count: 32 },
  ]

  const collegeMajors = [
    { name: "هندسة", count: 45 },
    { name: "طب", count: 38 },
    { name: "إدارة أعمال", count: 32 },
    { name: "تربية", count: 28 },
    { name: "علوم", count: 24 },
    { name: "آخرى", count: 120 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:to-slate-900">
      <Header onLoginClick={() => {}} onLogout={() => {}} userRole={null} />

      {/* Page Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
            <BarChart3 className="w-10 h-10" />
            الإحصائيات والتقارير
          </h1>
          <p className="text-foreground/70">لمحة عامة عن أسر المغتربين والخدمة</p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard icon={Home} title="إجمالي الأسر" value={stats.totalFamilies} color="primary" />
            <StatCard icon={Users} title="إجمالي الأعضاء" value={stats.totalMembers} color="accent" />
            <StatCard icon={User} title="الكهنة" value={stats.totalPriests} color="primary" />
            <StatCard icon={TrendingUp} title="المسؤولون" value={stats.totalAdmins} color="accent" />
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gender Distribution */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-primary">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <Users className="w-6 h-6" />
                توزيع الأعضاء حسب النوع
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground/70">ذكور</span>
                    <span className="font-bold text-foreground">
                      {stats.maleMembers} ({Math.round((stats.maleMembers / stats.totalMembers) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${(stats.maleMembers / stats.totalMembers) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground/70">إناث</span>
                    <span className="font-bold text-foreground">
                      {stats.femaleMembers} ({Math.round((stats.femaleMembers / stats.totalMembers) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-accent h-3 rounded-full"
                      style={{ width: `${(stats.femaleMembers / stats.totalMembers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Age Distribution */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-accent">
              <h2 className="text-2xl font-bold text-accent mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                توزيع الأعضاء حسب السن
              </h2>
              <div className="space-y-3">
                {ageDistribution.map((age) => (
                  <div key={age.range}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground/70">{age.range} سنة</span>
                      <span className="font-bold text-foreground">{age.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{ width: `${(age.count / stats.totalMembers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* More Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Families List */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-primary">
              <h2 className="text-2xl font-bold text-primary mb-6">الأسر</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {familiesData.map((family) => (
                  <div
                    key={family.name}
                    className="flex items-center justify-between p-4 bg-blue-50 dark:bg-slate-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{family.name}</p>
                      <p className="text-sm text-foreground/60">{family.members} عضو</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        family.active
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {family.active ? "نشط" : "غير نشط"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* College Majors */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-accent">
              <h2 className="text-2xl font-bold text-accent mb-6 flex items-center gap-2">
                <PieChart className="w-6 h-6" />
                التخصصات الأكاديمية
              </h2>
              <div className="space-y-3">
                {collegeMajors.map((major) => (
                  <div
                    key={major.name}
                    className="flex items-center justify-between p-3 bg-blue-50 dark:bg-slate-700 rounded-lg"
                  >
                    <span className="text-foreground/70">{major.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{major.count}</span>
                      <span className="text-xs text-foreground/50">
                        ({Math.round((major.count / stats.totalMembers) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function StatCard({
  icon: Icon,
  title,
  value,
  color,
}: { icon: React.ComponentType<any>; title: string; value: number; color: "primary" | "accent" }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-t-4 border-${color}`}>
      <div className={`flex items-center justify-between`}>
        <div>
          <p className="text-sm text-foreground/60 mb-1">{title}</p>
          <p className={`text-4xl font-bold text-${color}`}>{value}</p>
        </div>
        <Icon className={`w-12 h-12 text-${color} opacity-20`} />
      </div>
    </div>
  )
}
