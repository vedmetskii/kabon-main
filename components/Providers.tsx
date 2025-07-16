"use client";

import { NextUIProvider } from "@nextui-org/react"
import { useEffect, useState } from "react";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) return null

    return <NextUIProvider>
            {children}
    </NextUIProvider>
}
