"use client"
import { ProtectedRoute } from "@/components/protected-route"
import PriestDashboard from "@/components/priest-dashboard"

export default function PriestPage() {
  return (
    <ProtectedRoute allowedRoles={["priest"]}>
      <PriestDashboard />
    </ProtectedRoute>
  )
}
