"use client"

import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return <ThemeProvider>
        <NextUIProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </NextUIProvider>
    </ThemeProvider>
}