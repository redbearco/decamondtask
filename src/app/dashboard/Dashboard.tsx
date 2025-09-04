"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import { getUser, clearUser } from "@/lib/storage"
import Image from "next/image"
import { UserData } from "@/types/user"
import { AuthLayout } from "@/components/layout/AuthLayout"

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<UserData | null>(null)

    useEffect(() => {
        const storedUser = getUser()
        if (!storedUser) {
            router.replace("/")
        } else {
            setUser(storedUser)
        }
    }, [router])

    const handleLogout = useCallback(() => {
        clearUser()
        router.push("/")
    }, [router])

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>در حال بارگذاری...</p>
            </div>
        )
    }

    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold">خوش آمدید {user?.name}</h1>

            {user?.picture && (
                <Image
                    src={user.picture}
                    alt={user?.name}
                    width={96}
                    height={96}
                    className="rounded-full"

                />
            )}

            <p className="text-gray-600">{user?.email}</p>
            <Button
                onClick={handleLogout}
                type="submit"
                className="text-xl cursor-pointer"
            >
                خروج
            </Button>
        </AuthLayout>
    )
}