"use client";

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useState } from "react";
import { SignOutButton } from "./SignOutButton";
import { useRouter } from "next/navigation";


const navbarItems = [
    { label: "Admin page", href: "/admin" },
    { label: "Create Post", href: "/admin/create_post" },
    { label: "Edit Post", href: "/admin/edit_post" },
    { label: "Create Page", href: "/admin/create_page" },
    { label: "Edit Page", href: "/admin/edit_page" }
]


export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    return <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <h1>Logo</h1>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center" className="hidden sm:flex gap-4">
            {navbarItems.map((navbarItem) => (
                <NavbarItem key={navbarItem.label}>
                    <Button
                        variant="light"
                        onClick={() => { router.push(navbarItem.href) }}
                    >
                        {navbarItem.label}
                    </Button>
                </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem>
                <SignOutButton />
            </NavbarItem>
            <NavbarItem>
                <ThemeSwitcher />
            </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
            {navbarItems.map((navbarItem) => (
                <NavbarMenuItem key={navbarItem.label}>
                    <Button
                        variant="light"
                        onClick={() => { router.push(navbarItem.href) }}
                    >
                        {navbarItem.label}
                    </Button>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
}