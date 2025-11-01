"use client"
import { Cable as Candle } from "lucide-react"
import { useFirebaseData } from "@/lib/firebase-hooks"

interface DailyReflectionData {
  verse: string
  reference: string
  reflection: string
}

interface DailyReflectionProps {
  userRole: "member" | "priest" | "admin" | null
}

export default function DailyReflection({ userRole }: DailyReflectionProps) {
  const { data: reflectionData, loading } = useFirebaseData<DailyReflectionData>("dailyReflection/today")

  const today = new Date().toLocaleDateString("ar-EG")

  // Fallback reflection if not available
  const defaultReflection = {
    verse: "لأنه هكذا أحب الله العالم حتى بذل ابنه الوحيد لكي لا يهلك كل من يؤمن به بل تكون له الحياة الأبدية",
    reference: "إنجيل يوحنا ٣: ١٦",
    reflection: "في هذا اليوم، نتذكر محبة الله اللانهائية لنا. محبة بلا حدود، ضحية بلا ندم، غفران بلا شروط.",
  }

  const reflection = reflectionData || defaultReflection

  if (loading) {
    return (
      <aside className="bg-gradient-to-b from-primary/20 to-accent/10 rounded-xl p-6 border-r-4 border-accent shadow-lg sticky top-24">
        <div className="flex items-center gap-2 mb-4">
          <Candle className="w-6 h-6 text-accent" />
          <h3 className="text-2xl font-bold text-primary">التأمل اليومي</h3>
        </div>
        <p className="text-center text-foreground/60">جاري التحميل...</p>
      </aside>
    )
  }

  return (
    <aside className="bg-gradient-to-b from-primary/20 to-accent/10 rounded-xl p-6 border-r-4 border-accent shadow-lg sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <Candle className="w-6 h-6 text-accent" />
        <h3 className="text-2xl font-bold text-primary">التأمل اليومي</h3>
      </div>

      <p className="text-sm text-foreground/60 mb-4">{today}</p>

      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border-l-4 border-accent">
          <p className="text-lg font-semibold text-foreground mb-2">{reflection.verse}</p>
          <p className="text-sm text-foreground/70">{reflection.reference}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-foreground leading-relaxed">{reflection.reflection}</p>
        </div>

        <p className="text-center text-sm text-foreground/60 font-semibold border-t border-border pt-4">
          ✨ "السلام عليكم ورحمة الله وبركاته" ✨
        </p>
      </div>
    </aside>
  )
}
