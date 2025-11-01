import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) return

  const headers = Object.keys(data[0])
  let csv = headers.join(",") + "\n"

  data.forEach((row) => {
    csv +=
      headers
        .map((header) => {
          const value = row[header]
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`
          }
          return value
        })
        .join(",") + "\n"
  })

  const blob = new Blob([csv], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

export function exportToExcel(data: any[], filename: string) {
  if (!data || data.length === 0) return

  let html = "<table><tr>"
  const headers = Object.keys(data[0])
  headers.forEach((header) => {
    html += `<th>${header}</th>`
  })
  html += "</tr>"

  data.forEach((row) => {
    html += "<tr>"
    headers.forEach((header) => {
      html += `<td>${row[header]}</td>`
    })
    html += "</tr>"
  })
  html += "</table>"

  const blob = new Blob([html], { type: "application/vnd.ms-excel" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}
