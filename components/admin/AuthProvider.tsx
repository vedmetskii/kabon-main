"use client"

import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const AuthProvider = ({ children, roles = [] }: { children: React.ReactNode, roles: string[] }) => {
    const {status, data} = useSession()
    const router = useRouter()
    const pathname = usePathname()

    if (status === "loading") {
        return <h1>Loading...</h1>
    }

    if ((status === "unauthenticated") && (pathname != '/admin/auth/signin')) {
        router.push(`/admin/auth/signin?callbackUrl=${pathname}`)
    }

    if ((!data) || (!data.user) || (!data.user.name) || (isNotCurrentUser(data.user.name, roles))) {
        return <h1>Not permissions</h1>
    }

    return <>{children}</>
}

const isNotCurrentUser = (username: string, roles: string[]): boolean => {
    return false
}

export { AuthProvider }