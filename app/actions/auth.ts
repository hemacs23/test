"use server"

import { ref, get } from "firebase/database"
import { getServerDatabase } from "@/lib/firebase"

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const database = getServerDatabase()
    const mainAdminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN
    if (token === mainAdminToken) {
      return true
    }

    const adminRef = ref(database, `admins/${token}`)
    const snapshot = await get(adminRef)
    return snapshot.exists()
  } catch (error) {
    console.error("[v0] verifyAdminToken error:", error)
    return false
  }
}

export async function verifyPriestCredentials(name: string, code: string): Promise<boolean> {
  try {
    const database = getServerDatabase()
    const priestsRef = ref(database, "priests")
    const snapshot = await get(priestsRef)

    if (snapshot.exists()) {
      const priests = snapshot.val()
      return Object.values(priests).some((p: any) => p.name === name && p.code === code)
    }
    return false
  } catch (error) {
    console.error("[v0] verifyPriestCredentials error:", error)
    return false
  }
}

export async function verifyMemberCode(code: string): Promise<boolean> {
  try {
    const database = getServerDatabase()
    const familiesRef = ref(database, "families")
    const snapshot = await get(familiesRef)

    if (snapshot.exists()) {
      const families = snapshot.val()
      return Object.values(families).some((f: any) => f.code === code)
    }
    return false
  } catch (error) {
    console.error("[v0] verifyMemberCode error:", error)
    return false
  }
}
