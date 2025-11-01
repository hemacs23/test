"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { verifyAdminToken, verifyPriestCredentials, verifyMemberCode } from "@/app/actions/auth"

export type UserRole = "admin" | "priest" | "member" | null

export interface User {
  id: string
  name: string
  role: UserRole
  familyId?: string
  familyName?: string
  token: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (role: UserRole, token: string, name?: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("[v0] Error loading user:", error)
      localStorage.removeItem("user")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (role: UserRole, token: string, name = "") => {
    try {
      let isValid = false

      if (role === "admin") {
        isValid = await verifyAdminToken(token)
      } else if (role === "priest") {
        const [priestName, priestCode] = name.split(":")
        isValid = await verifyPriestCredentials(priestName, priestCode)
      } else if (role === "member") {
        isValid = await verifyMemberCode(token)
      }

      if (!isValid) {
        return false
      }

      const newUser: User = {
        id: `${role}-${Date.now()}`,
        name: name || `${role}-user`,
        role,
        token,
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("[v0] Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
