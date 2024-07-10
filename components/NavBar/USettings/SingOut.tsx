"use client"
import { signOut } from "next-auth/react"

export function SignOut() {
    signOut({redirect: true, callbackUrl: '/'})
    return <div>Sing Out</div>
}