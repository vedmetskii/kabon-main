"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "@nextui-org/use-theme";
import { useEffect, useState } from "react";
import { MoonIcon } from "@/components/Icons/MoonIcon"
import { SunIcon } from "@/components/Icons/SunIcon"

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return <Switch
        defaultSelected
        size="lg"
        color="secondary"
        isSelected={theme == 'dark'}
        onValueChange={(value) => {
            value ? setTheme('dark') : setTheme('ligth')
        }}
        onChange={() => {
            theme == 'ligth' ? setTheme('dark') : setTheme('ligth')
        }}
        thumbIcon={({ className }) =>
            theme == 'dark' ? (
                <MoonIcon className={className} />
            ) : (
                <SunIcon className={className} />
            )
        }
    />

};
