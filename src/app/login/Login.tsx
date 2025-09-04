"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { validatePhone } from "@/lib/validation"
import { fetchUser } from "@/lib/api"
import { getUser, saveUser } from "@/lib/storage"
import { UserData } from "@/types/user"
import { AuthLayout } from "@/components/layout/AuthLayout"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedUser = getUser()
    if (storedUser) {
      router.replace("/dashboard")
    }
  }, [router])

  const handleLogin = useCallback(async () => {
    setError("")

    if (!validatePhone(phone)) {
      setError("شماره موبایل معتبر نیست 09337200943")
      return
    }

    setLoading(true)
    try {
      const user: UserData = await fetchUser(phone)
      saveUser(user)
      router.push("/dashboard")
    } catch (err) {
      setError("مشکلی پیش آمد. دوباره تلاش کنید.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [phone, router])

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold mb-4 text-center">ورود</h1>
      <Input
        id="phone"
        type="tel"
        label="شماره موبایل"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={error}
        placeholder="مثال: 09337200943"
      />

      <Button
        onClick={handleLogin}
        disabled={loading}
        isLoading={loading}
        type="submit"
        className="text-xl cursor-pointer"
      >
        ورود
      </Button>
    </AuthLayout>
  )
}
