"use client";

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    InternalForwardRefRenderFunction,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {NavbarItemProps} from "@nextui-org/navbar";
import useSWR from "swr";
import {getNavLinks} from "@/services/fetchData";

export function NavLinks(
    {
        NavItem
    }: {
        NavItem: InternalForwardRefRenderFunction<"li", NavbarItemProps, never>
    }
) {
    const router = useRouter();

    const { data: navLinks, isLoading } = useSWR("newNavLinks", getNavLinks)

    if (isLoading) {
        return <h1>Loading...</h1>
    } else if (!navLinks) {
        return <h1>Error 404... NavLinks not found</h1>
    }

    return <>{navLinks.map((navLink) => (
        <div key={`${navLink.id}-${NavItem}`}>
            {navLink.subLinks[1] ? (
                <Dropdown>
                    <NavItem>
                        <DropdownTrigger>
                            <Button variant="light">
                                {navLink.title}
                            </Button>
                        </DropdownTrigger>
                    </NavItem>
                    <DropdownMenu>
                        {navLink.subLinks.map((subLink) => (
                            <DropdownItem key={`${subLink.title}-${subLink.id}`}>
                                <Button
                                    variant="light"
                                    onClick={() => router.push(subLink.path)}
                                >{subLink.title}</Button>
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <NavItem>
                    <Button
                        variant="light"
                        onClick={() => router.push(navLink.path)}
                    >{navLink.title}</Button>
                </NavItem>
            )}
        </div>
    ))}</>
}
