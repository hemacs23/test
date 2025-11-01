import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getDatabase, type Database } from "firebase/database"
import { getAuth, type Auth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

let app: FirebaseApp | null = null
let database: Database | null = null
let auth: Auth | null = null

function initializeFirebase(): { app: FirebaseApp; database: Database; auth: Auth } | null {
  try {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.databaseURL || !firebaseConfig.appId) {
      console.error("[v0] Firebase: Missing required environment variables")
      return null
    }

    if (getApps().length === 0) {
      console.log("[v0] Initializing Firebase...")
      app = initializeApp(firebaseConfig)
      database = getDatabase(app)
      auth = getAuth(app)
      console.log("[v0] Firebase initialized successfully")
    } else {
      app = getApps()[0]
      database = getDatabase(app)
      auth = getAuth(app)
    }

    if (!database || !auth) {
      throw new Error("Firebase initialization failed")
    }

    return { app, database, auth }
  } catch (error) {
    console.error("[v0] Firebase initialization error:", error)
    return null
  }
}

const initialized = initializeFirebase()

export function getDatabase_(): Database | null {
  if (!database) {
    const result = initializeFirebase()
    if (result) {
      return result.database
    }
    return null
  }
  return database
}

export function getAuth_(): Auth | null {
  if (!auth) {
    const result = initializeFirebase()
    if (result) {
      return result.auth
    }
    return null
  }
  return auth
}

export function getServerDatabase(): Database {
  const db = getDatabase_()
  if (!db) {
    throw new Error("Firebase database is not initialized. Check your environment variables.")
  }
  return db
}

export default initialized?.app || null
