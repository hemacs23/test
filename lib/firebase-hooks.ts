"use client"

import { useState, useEffect } from "react"
import { ref, onValue, set, update, remove } from "firebase/database"
import { getDatabase_ } from "./firebase"

export function useFirebaseData<T>(path: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const setupListener = () => {
      try {
        const database = getDatabase_()
        if (!database) {
          setError("قاعدة البيانات لم تُهيّأ بعد")
          setLoading(false)
          return
        }

        const dataRef = ref(database, path)
        console.log("[v0] Setting up listener for:", path)

        unsubscribe = onValue(
          dataRef,
          (snapshot) => {
            try {
              if (snapshot.exists()) {
                const value = snapshot.val()
                console.log("[v0] Data received for", path, ":", value)
                setData(value)
              } else {
                console.log("[v0] No data found for", path)
                setData(null)
              }
              setError(null)
              setLoading(false)
            } catch (err) {
              const errorMsg = err instanceof Error ? err.message : "خطأ في قراءة البيانات"
              console.error("[v0] Data read error:", err)
              setError(errorMsg)
              setLoading(false)
            }
          },
          (err) => {
            const errorMsg = err.message || "خطأ في الاتصال بقاعدة البيانات"
            console.error("[v0] Database listener error:", err)
            setError(errorMsg)
            setLoading(false)
          },
        )
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "خطأ غير معروف"
        console.error("[v0] useFirebaseData error:", err)
        setError(errorMsg)
        setLoading(false)
      }
    }

    setupListener()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [path])

  return { data, loading, error }
}

export async function writeData(path: string, data: unknown) {
  try {
    const database = getDatabase_()
    if (!database) {
      throw new Error("قاعدة البيانات لم تُهيّأ بعد")
    }

    const dataRef = ref(database, path)
    await set(dataRef, data)
    console.log("[v0] Data written successfully to", path)
    return { success: true }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "خطأ في الكتابة"
    console.error("[v0] Write error:", error)
    return { success: false, error: errorMsg }
  }
}

export async function updateData(path: string, updates: Record<string, unknown>) {
  try {
    const database = getDatabase_()
    if (!database) {
      throw new Error("قاعدة البيانات لم تُهيّأ بعد")
    }

    const dataRef = ref(database, path)
    await update(dataRef, updates)
    console.log("[v0] Data updated successfully at", path)
    return { success: true }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "خطأ في التحديث"
    console.error("[v0] Update error:", error)
    return { success: false, error: errorMsg }
  }
}

export async function deleteData(path: string) {
  try {
    const database = getDatabase_()
    if (!database) {
      throw new Error("قاعدة البيانات لم تُهيّأ بعد")
    }

    const dataRef = ref(database, path)
    await remove(dataRef)
    console.log("[v0] Data deleted successfully from", path)
    return { success: true }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "خطأ في الحذف"
    console.error("[v0] Delete error:", error)
    return { success: false, error: errorMsg }
  }
}
