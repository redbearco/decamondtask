"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { validatePhone } from "@/lib/validation"
import { fetchUser } from "@/lib/api"
import { saveUser, UserData } from "@/lib/storage"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

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
    <div className="flex items-center justify-center min-h-screen bg-blue-950 px-4">
      <div className="w-full max-w-md bg-gray-300 shadow-lg rounded-2xl p-6">
        <h1 className="text-4xl font-bold mb-4 text-center">ورود</h1>

        <label htmlFor="phone" className="block text-2xl mb-1 text-right font-bold">
          شماره موبایل
        </label>
        <Input
          ref={inputRef}
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="مثال: 09337200943"
          className="mb-2 text-xl"
        />

        {error && <p className="text-red-400 text-base mb-2">{error}</p>}

        <Button
          onClick={handleLogin}
          disabled={loading}
          className="bg-white w-full text-xl cursor-pointer"
        >
          {loading ? "در حال ورود ..." : "ورود"}
        </Button>
      </div>
    </div>
  )
}
