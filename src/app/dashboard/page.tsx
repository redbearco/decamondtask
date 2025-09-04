import type { Metadata } from "next"
import Dashboard from "./Dashboard"

export const metadata: Metadata = {
  title: "داشبورد | دکاموند",
  description: "داشبورد سیستم مدیریت دکاموند",
}

export default function Page() {
  return <Dashboard />
}
