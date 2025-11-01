"use client"

import { useState } from "react"
import Header from "@/components/header"
import { ChevronRight, MapPin, Users, Search } from "lucide-react"
import Footer from "@/components/footer"

interface Family {
  id: string
  name: string
  location: string
  priest: string
  membersCount: number
  code: string
}

interface Member {
  id: string
  name: string
  age: number
  college: string
  city: string
  phone: string
  address: string
  location: string
  birthDate: string
}

export default function FamiliesPage() {
  const [families] = useState<Family[]>([
    {
      id: "1",
      name: "أسرة القاهرة",
      location: "القاهرة",
      priest: "أب بيشوي",
      membersCount: 45,
      code: "CAIRO001",
    },
    {
      id: "2",
      name: "أسرة الإسكندرية",
      location: "الإسكندرية",
      priest: "أب يوحنا",
      membersCount: 38,
      code: "ALEX001",
    },
    {
      id: "3",
      name: "أسرة الجيزة",
      location: "الجيزة",
      priest: "أب متى",
      membersCount: 32,
      code: "GIZA001",
    },
    {
      id: "4",
      name: "أسرة الفيوم",
      location: "الفيوم",
      priest: "أب إبراهيم",
      membersCount: 28,
      code: "FAYOUM001",
    },
    {
      id: "5",
      name: "أسرة بني سويف",
      location: "بني سويف",
      priest: "أب مرقس",
      membersCount: 24,
      code: "BENI001",
    },
    {
      id: "6",
      name: "أسرة المنيا",
      location: "المنيا",
      priest: "أب يعقوب",
      membersCount: 31,
      code: "MINYA001",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null)

  const filteredFamilies = families.filter(
    (family) => family.name.includes(searchTerm) || family.location.includes(searchTerm),
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:to-slate-900">
      <Header onLoginClick={() => {}} onLogout={() => {}} userRole={null} />

      {/* Page Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2">الأسر</h1>
          <p className="text-foreground/70">اكتشف أسر المغتربين في جميع الأنحاء</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="ابحث عن أسرة أو مدينة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-4 pr-12 border-2 border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800"
            />
          </div>

          {/* Families Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFamilies.map((family) => (
              <div
                key={family.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-xl transition border-r-4 border-primary p-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 group"
                onClick={() => setSelectedFamily(family)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <ChevronRight className="w-6 h-6 text-primary/50 group-hover:text-primary transition" />
                </div>

                <h3 className="text-xl font-bold text-primary mb-3">{family.name}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{family.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Users className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{family.membersCount} عضو</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-foreground/60 mb-2">الأب الكاهن</p>
                  <p className="font-semibold text-foreground">{family.priest}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredFamilies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-foreground/60">لم يتم العثور على أسر</p>
            </div>
          )}
        </div>
      </section>

      {/* Family Detail Modal */}
      {selectedFamily && <FamilyDetailModal family={selectedFamily} onClose={() => setSelectedFamily(null)} />}

      <Footer />
    </main>
  )
}

function FamilyDetailModal({ family, onClose }: { family: Family; onClose: () => void }) {
  const [members] = useState<Member[]>([
    {
      id: "1",
      name: "أحمد علي",
      age: 22,
      college: "هندسة",
      city: "القاهرة",
      phone: "0123456789",
      address: "شارع النيل",
      location: "https://maps.google.com",
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
      location: "https://maps.google.com",
      birthDate: "2004-08-22",
    },
    {
      id: "3",
      name: "محمد حسن",
      age: 21,
      college: "إدارة أعمال",
      city: "القاهرة",
      phone: "0156789012",
      address: "شارع النيل الجديد",
      location: "https://maps.google.com",
      birthDate: "2003-03-10",
    },
  ])
  const [searchMember, setSearchMember] = useState("")

  const filteredMembers = members.filter(
    (m) => m.name.includes(searchMember) || m.college.includes(searchMember) || m.city.includes(searchMember),
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-primary">{family.name}</h2>
            <p className="text-foreground/70 mt-1">الأب الكاهن: {family.priest}</p>
          </div>
          <button onClick={onClose} className="text-foreground/50 hover:text-foreground text-2xl">
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-8">
          {/* Family Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-foreground/60 mb-2">المدينة</p>
              <p className="text-2xl font-bold text-primary">{family.location}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-slate-800 rounded-lg border-r border-l border-border">
              <p className="text-sm text-foreground/60 mb-2">عدد الأعضاء</p>
              <p className="text-2xl font-bold text-accent">{filteredMembers.length}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-foreground/60 mb-2">كود الأسرة</p>
              <p className="text-xl font-bold text-primary">{family.code}</p>
            </div>
          </div>

          {/* Search Members */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">البحث عن عضو</label>
            <input
              type="text"
              placeholder="ابحث بالاسم أو الكلية أو المدينة..."
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              className="w-full px-4 py-3 border-2 border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800"
            />
          </div>

          {/* Members List */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">أعضاء الأسرة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-6 bg-white dark:bg-slate-800 rounded-lg border-r-4 border-primary shadow hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-foreground">{member.name}</h4>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">العمر:</span>
                      <span className="font-semibold">{member.age} سنة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">الكلية:</span>
                      <span className="font-semibold">{member.college}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">المدينة:</span>
                      <span className="font-semibold">{member.city}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 dark:bg-slate-700 rounded border border-primary/20">
                    <p className="text-xs text-foreground/60 mb-1">بيانات إضافية (للمسؤولين)</p>
                    <div className="space-y-1 text-xs">
                      <p className="font-semibold">{member.phone}</p>
                      <p className="text-foreground/70">{member.address}</p>
                      <p className="text-foreground/70">{member.birthDate}</p>
                      <a
                        href={member.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        الموقع على الخريطة
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
