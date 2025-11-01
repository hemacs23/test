"use client"
import Header from "@/components/header"
import { Heart, Target, Users, Sparkles } from "lucide-react"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:to-slate-900">
      <Header onLoginClick={() => {}} onLogout={() => {}} userRole={null} />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">عن الخدمة</h1>
          <p className="text-xl text-blue-100">الأمانة العامة لخدمة الشباب برعاية نيافة الحبر الجليل الأنبا أغاثون</p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-primary">الرؤية</h2>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              خدمة شبابية متكاملة تربط جميع أسر المغتربين من إيبارشية مغاغة والعدوة ببعضهم البعض وبالكنيسة الأم، وتوفر
              لهم بيئة روحية آمنة وداعمة يمكنهم من خلالها أن يعيشوا إيمانهم بقوة وثبات بعيداً عن أهاليهم.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border-r-4 border-accent">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-accent" />
              <h2 className="text-3xl font-bold text-accent">الرسالة</h2>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              تقديم خدمة شبابية متميزة تجمع بين التنشئة الروحية السليمة والرعاية الاجتماعية الفعالة، مع الحفاظ على القيم
              الكنسية والعقائد الأرثوذكسية، وتوفير منصة تفاعلية تسهل التواصل والتنسيق بين جميع أعضاء الخدمة.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-blue-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">قيمنا الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "الروحانية", description: "الإيمان والحياة الروحية السليمة" },
              { icon: Users, title: "التكامل", description: "الوحدة والتعاون بين جميع الأعضاء" },
              { icon: Heart, title: "المحبة", description: "الحب الحقيقي والخدمة المخلصة" },
              { icon: Target, title: "التطور", description: "النمو الشخصي والخدمي المستمر" },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow text-center border-t-4 border-primary"
              >
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">أهدافنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "بناء جيل من الشباب الأرثوذكسي الواعي بدينه والملتزم به",
              "توفير بيئة آمنة ومستقرة للشباب المغتربين",
              "تعزيز الروابط الاجتماعية والروحية بين أعضاء الخدمة",
              "إعداد قيادات شبابية قادرة على تحمل مسؤوليات الخدمة",
              "تقديم برامج تعليمية وروحية متميزة",
              "خدمة المجتمع من خلال أنشطة اجتماعية مؤثرة",
            ].map((objective, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow border-r-4 border-accent"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-foreground/80">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
