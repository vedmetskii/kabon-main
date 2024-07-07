"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon } from "@/components/Icons/MoonIcon"
import { SunIcon } from "@/components/Icons/SunIcon"

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isSelected, setIsSelected] = useState(theme == 'dark');

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return <Switch
        defaultSelected
        size="lg"
        color="secondary"
        isSelected={isSelected}
        onValueChange={setIsSelected}
        onChange={() => {
            theme == 'ligth' ? setTheme('dark') : setTheme('ligth')
        }}
        thumbIcon={({ isSelected, className }) =>
            isSelected ? (
                <MoonIcon className={className} />
            ) : (
                <SunIcon className={className} />
            )
        }
    />

};