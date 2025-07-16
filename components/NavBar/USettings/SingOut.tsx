"use client"
import { signOut } from "@/utils/auth-client"
import { useRouter } from "next/navigation"

export function SignOut() {
    const router = useRouter()
    signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/")
            }
        }
    })
    return <div>Sing Out</div>
}
