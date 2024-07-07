"use client"

import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const {status} = useSession()
    const router = useRouter()
    const pathname = usePathname()

    if (status === "loading") {
        return <h1>Loading...</h1>
    }

    if ((status === "unauthenticated") && (pathname != '/admin/auth/signin')) {
        router.push(`/admin/auth/signin?callbackUrl=${pathname}`)
    }

    return <>{children}</>
}

export { AuthProvider }