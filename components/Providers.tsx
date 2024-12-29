"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return <ThemeProvider>
        <NextUIProvider>
                {children}
        </NextUIProvider>
    </ThemeProvider>
}
