"use client"

import { useSession } from "@/utils/auth-client"
import { usePathname, useRouter } from "next/navigation"

const AuthProvider = ({ children, roles }: { children: React.ReactNode, roles: string[] }) => {
    const {data, error, isPending} = useSession()
    const router = useRouter()
    const pathname = usePathname()

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (!data || error) {
        router.push(`/user/signin?callbackUrl=${pathname}`)
        return
    }


    if ((!data.user?.name) || (!data.user.role) || (!roles.includes(data.user.role))) {
        return <h1>Not permissions</h1>
    }

    return <>{children}</>
}

export { AuthProvider }
