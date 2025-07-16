"use client"
import { signOut } from "next-auth/react"

export default function SignOutPage() {
    signOut({redirect: true, callbackUrl: '/admin'})
}