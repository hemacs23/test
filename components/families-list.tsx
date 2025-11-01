"use client"

import { useState } from "react"
import { ChevronRight, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFirebaseData } from "@/lib/firebase-hooks"

interface Family {
  id: string
  name: string
  location: string
  priest: string
  membersCount: number
}

interface Member {
  id: string
  name: string
  age: number
  college: string
  city: string
  phone?: string
  address?: string
  birthDate: string
}

interface FamiliesListProps {
  userRole: "member" | "priest" | "admin" | null
  userToken: string | null
}

export default function FamiliesList({ userRole, userToken }: FamiliesListProps) {
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null)

  const { data: familiesData, loading, error } = useFirebaseData<Record<string, any>>("families")

  const families: Family[] = familiesData
    ? Object.entries(familiesData).map(([id, fam]: [string, any]) => ({
        id,
        name: fam.name || "",
        location: fam.location || "",
        priest: fam.priest || "",
        membersCount: fam.membersCount || 0,
      }))
    : []

  if (loading) {
    return (
      <section id="families" className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">الأسر</h2>
        <div className="text-center text-foreground/60">جاري التحميل...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="families" className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">الأسر</h2>
        <div className="text-center text-red-500">{error}</div>
      </section>
    )
  }

  return (
    <section id="families" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary">الأسر</h2>
        {userRole === "admin" && <Button className="bg-accent hover:bg-accent/90">إضافة أسرة جديدة</Button>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {families.map((family) => (
          <div
            key={family.id}
            className="bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition border-r-4 border-primary p-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700"
            onClick={() => setSelectedFamily(family)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-primary mb-2">{family.name}</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{family.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{family.membersCount} عضو</span>
                  </div>
                  <p className="text-foreground/60 font-semibold">الأب الكاهن: {family.priest}</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-primary flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {selectedFamily && (
        <FamilyDetail
          family={selectedFamily}
          onClose={() => setSelectedFamily(null)}
          userRole={userRole}
          userToken={userToken}
        />
      )}
    </section>
  )
}

function FamilyDetail({
  family,
  onClose,
  userRole,
  userToken,
}: {
  family: Family
  onClose: () => void
  userRole: "member" | "priest" | "admin" | null
  userToken: string | null
}) {
  const { data: membersData } = useFirebaseData<Record<string, Member>>(`families/${family.id}/members`)

  const members: Member[] = membersData
    ? Object.entries(membersData).map(([id, member]: [string, any]) => ({
        id,
        ...member,
      }))
    : []

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-gradient-to-r from-primary/10 to-accent/10">
          <h2 className="text-2xl font-bold text-primary">{family.name}</h2>
          <button onClick={onClose} className="text-foreground/50 hover:text-foreground">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-foreground/60">الأب الكاهن</p>
              <p className="text-lg font-bold text-primary">{family.priest}</p>
            </div>
            <div className="text-center border-r border-l border-border">
              <p className="text-sm text-foreground/60">المدينة</p>
              <p className="text-lg font-bold text-accent">{family.location}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-foreground/60">عدد الأعضاء</p>
              <p className="text-lg font-bold text-accent">{members.length}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-2">الأعضاء</h3>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg border border-primary/20">
                <p className="font-bold text-foreground mb-2">{member.name}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <span className="text-foreground/60">العمر:</span> {member.age}
                  </p>
                  <p>
                    <span className="text-foreground/60">الكلية:</span> {member.college}
                  </p>
                  <p>
                    <span className="text-foreground/60">المدينة:</span> {member.city}
                  </p>
                  {(userRole === "priest" || userRole === "admin") && member.phone && (
                    <>
                      <p>
                        <span className="text-foreground/60">الهاتف:</span> {member.phone}
                      </p>
                    </>
                  )}
                  {(userRole === "priest" || userRole === "admin") && member.address && (
                    <p>
                      <span className="text-foreground/60">العنوان:</span> {member.address}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
