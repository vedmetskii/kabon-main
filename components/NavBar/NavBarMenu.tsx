"use client"
import {NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import { NavLinks } from "@/components/NavBar/NavLinks";

export const NavBarMenu = () => {
    return <NavbarMenu>
        <NavLinks NavItem={NavbarMenuItem}/>
    </NavbarMenu>
}