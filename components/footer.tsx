"use client"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-accent text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">✝️</span>
              الأمانة العامة لخدمة الشباب
            </h3>
            <p className="text-blue-100">برعاية نيافة الحبر الجليل الأنبا أغاثون</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">الروابط السريعة</h4>
            <ul className="space-y-2 text-blue-100">
              <li>
                <a href="#" className="hover:text-white transition">
                  الأسر
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  الأخبار
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  الفعاليات
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  عن الخدمة
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">معلومات التواصل</h4>
            <p className="text-blue-100 mb-2">البريد الإلكتروني: info@khedma.org</p>
            <p className="text-blue-100">الهاتف: +20 100 123 4567</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-blue-100 mb-2">
            صُنع بـ
            <Heart className="w-4 h-4 inline mx-1 text-red-300" />
            من أجل خدمة الشباب الكنسي
          </p>
          <p className="text-sm text-blue-100/60">© 2025 الأمانة العامة لخدمة الشباب. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
