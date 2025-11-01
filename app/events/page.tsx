"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Calendar, MapPin, Users, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import { useFirebaseData } from "@/lib/firebase-hooks"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  locationLink: string
  family: string
  capacity: number
  registrations: number
  type: "قداس" | "اجتماع" | "رحلة" | "ورشة عمل"
}

export default function EventsPage() {
  const { data: eventsData, loading } = useFirebaseData<Record<string, Event>>("events")

  const events: Event[] = eventsData
    ? Object.entries(eventsData).map(([id, event]: [string, any]) => ({
        id,
        ...event,
      }))
    : []

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [userRegistrations, setUserRegistrations] = useState<string[]>([])

  const handleRegister = (eventId: string) => {
    if (!userRegistrations.includes(eventId)) {
      setUserRegistrations([...userRegistrations, eventId])
    }
  }

  const handleUnregister = (eventId: string) => {
    setUserRegistrations(userRegistrations.filter((id) => id !== eventId))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:to-slate-900">
      <Header onLoginClick={() => {}} onLogout={() => {}} userRole={null} />

      {/* Page Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
            <Calendar className="w-10 h-10" />
            الفعاليات والتقويم
          </h1>
          <p className="text-foreground/70">تصفح جميع الفعاليات والأنشطة القادمة</p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Events Cards */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="text-center py-12">جاري التحميل...</div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition border-r-4 border-primary p-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                              event.type === "قداس"
                                ? "bg-primary"
                                : event.type === "رحلة"
                                  ? "bg-accent"
                                  : event.type === "اجتماع"
                                    ? "bg-blue-500"
                                    : "bg-purple-500"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-primary">{event.title}</h3>
                      </div>
                    </div>

                    <p className="text-foreground/70 mb-4 line-clamp-2">{event.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Users className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>
                          {event.registrations}/{event.capacity}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!userRegistrations.includes(event.id) ? (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRegister(event.id)
                          }}
                          className="bg-accent hover:bg-accent/90"
                          size="sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          تأكيد الحضور
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUnregister(event.id)
                          }}
                          variant="outline"
                          size="sm"
                        >
                          إلغاء التأكيد
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calendar Sidebar */}
            <aside className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border-r-4 border-accent h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-6">تأكيداتك</h2>
              {userRegistrations.length > 0 ? (
                <div className="space-y-3">
                  {userRegistrations.map((eventId) => {
                    const event = events.find((e) => e.id === eventId)
                    return event ? (
                      <div
                        key={eventId}
                        className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                      >
                        <p className="font-semibold text-sm text-foreground">{event.title}</p>
                        <p className="text-xs text-foreground/60">{event.date}</p>
                      </div>
                    ) : null
                  })}
                </div>
              ) : (
                <p className="text-foreground/60 text-center py-8">لم تؤكد حضورك في أي فعالية</p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}

      <Footer />
    </main>
  )
}

function EventDetailModal({ event, onClose }: { event: Event; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border p-8 flex items-start justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-primary mb-3">
              {event.type}
            </div>
            <h2 className="text-3xl font-bold text-primary">{event.title}</h2>
          </div>
          <button onClick={onClose} className="text-foreground/50 hover:text-foreground text-2xl">
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-6">
          <p className="text-lg text-foreground/80">{event.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-foreground/60 mb-1">التاريخ</p>
              <p className="text-xl font-bold text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {event.date}
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-foreground/60 mb-1">الوقت</p>
              <p className="text-xl font-bold text-accent flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {event.time}
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg">
            <p className="text-sm text-foreground/60 mb-2">الموقع</p>
            <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              {event.location}
            </p>
            <a
              href={event.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              فتح على الخريطة
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg text-center">
              <p className="text-sm text-foreground/60 mb-1">الأسرة</p>
              <p className="font-bold text-foreground">{event.family}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-lg text-center">
              <p className="text-sm text-foreground/60 mb-1">التسجيلات</p>
              <p className="font-bold text-foreground">
                {event.registrations}/{event.capacity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
