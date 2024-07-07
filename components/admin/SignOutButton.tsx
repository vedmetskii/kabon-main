"use client"

import { Button } from "@nextui-org/react"
import { signOut } from "next-auth/react"
import { SignOutIcon } from '@/components/Icons/SignOutIcon'
import { useTheme } from "next-themes"

const SignOutButton = () => {
    const { theme } = useTheme()
    return <Button
        variant="light"
        onClick={() => { signOut({ redirect: false }) }}
        isIconOnly
        className="mt-2"
    >
        <SignOutIcon color={theme == 'ligth' ? 'black' : 'white'} />
    </Button>
}

export { SignOutButton }