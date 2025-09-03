"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import { getUser, clearUser, UserData } from "@/lib/storage"
import Image from "next/image"

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-950 px-4">

            <div className="bg-gray-300 shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto grid grid-cols-1 gap-4 justify-items-center text-center">
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

                <Button onClick={handleLogout} className="bg-white w-full text-xl cursor-pointer">
                    خروج
                </Button>
            </div>
        </div>
    )
}