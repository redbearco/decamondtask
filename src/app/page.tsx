import type { Metadata } from "next"
import Login from "./login/Login"

export const metadata: Metadata = {
  title: "ورود | دکاموند",
  description: "صفحه ورود به سیستم مدیریت دکاموند",
}

export default function Page() {
  return <Login />
}
