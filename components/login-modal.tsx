"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface LoginModalProps {
  onLogin: (role: "member" | "priest" | "admin", token: string) => void
  onClose: () => void
}

export default function LoginModal({ onLogin, onClose }: LoginModalProps) {
  const [loginType, setLoginType] = useState<"member" | "priest" | "admin" | null>(null)
  const [memberCode, setMemberCode] = useState("")
  const [adminName, setAdminName] = useState("")
  const [adminCode, setAdminCode] = useState("")
  const [mainAdminToken, setMainAdminToken] = useState("")
  const [error, setError] = useState("")

  const handleMemberLogin = () => {
    if (!memberCode.trim()) {
      setError("الرجاء إدخال كود الأسرة")
      return
    }
    onLogin("member", memberCode)
  }

  const handleAdminLogin = () => {
    if (!adminName.trim() || !adminCode.trim()) {
      setError("الرجاء إدخال الاسم والكود")
      return
    }
    onLogin("priest", `${adminName}:${adminCode}`)
  }

  const handleMainAdminLogin = () => {
    if (!mainAdminToken.trim()) {
      setError("الرجاء إدخال رمز المسؤول الرئيسي")
      return
    }
    onLogin("admin", mainAdminToken)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-primary">تسجيل الدخول</h2>
          <button onClick={onClose} className="text-foreground/50 hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!loginType ? (
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setLoginType("member")
                  setError("")
                }}
                className="w-full h-12 text-base bg-primary hover:bg-primary/90"
              >
                دخول عضو
              </Button>
              <Button
                onClick={() => {
                  setLoginType("priest")
                  setError("")
                }}
                className="w-full h-12 text-base bg-accent hover:bg-accent/90"
              >
                دخول أب كاهن / خادم
              </Button>
              <Button
                onClick={() => {
                  setLoginType("admin")
                  setError("")
                }}
                className="w-full h-12 text-base bg-destructive hover:bg-destructive/90"
              >
                دخول مسؤول رئيسي
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => {
                  setLoginType(null)
                  setError("")
                }}
                className="text-primary hover:underline mb-4"
              >
                ← عودة
              </button>

              {loginType === "member" && (
                <>
                  <input
                    type="text"
                    placeholder="كود الأسرة"
                    value={memberCode}
                    onChange={(e) => {
                      setMemberCode(e.target.value)
                      setError("")
                    }}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800"
                  />
                  <Button onClick={handleMemberLogin} className="w-full bg-primary hover:bg-primary/90">
                    دخول
                  </Button>
                </>
              )}

              {loginType === "priest" && (
                <>
                  <input
                    type="text"
                    placeholder="الاسم"
                    value={adminName}
                    onChange={(e) => {
                      setAdminName(e.target.value)
                      setError("")
                    }}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-slate-800"
                  />
                  <input
                    type="password"
                    placeholder="الكود"
                    value={adminCode}
                    onChange={(e) => {
                      setAdminCode(e.target.value)
                      setError("")
                    }}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:bg-slate-800"
                  />
                  <Button onClick={handleAdminLogin} className="w-full bg-accent hover:bg-accent/90">
                    دخول
                  </Button>
                </>
              )}

              {loginType === "admin" && (
                <>
                  <input
                    type="password"
                    placeholder="رمز المسؤول الرئيسي"
                    value={mainAdminToken}
                    onChange={(e) => {
                      setMainAdminToken(e.target.value)
                      setError("")
                    }}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive dark:bg-slate-800"
                  />
                  <Button onClick={handleMainAdminLogin} className="w-full bg-destructive hover:bg-destructive/90">
                    دخول
                  </Button>
                </>
              )}

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
