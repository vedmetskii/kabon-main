"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle } from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";
import { Breadcrumbs } from "./NavBar/Breadcrumbs";
import { NavLinks } from "./NavBar/NavLinks";
import { NavBarMenu } from "@/components/NavBar/NavBarMenu";


export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <>
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <h1>Logo</h1>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavLinks NavItem={NavbarItem}/>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
            <NavBarMenu/>
        </Navbar >
        <Breadcrumbs />
    </>
}