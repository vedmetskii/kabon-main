"use client";

import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import {NavbarItem} from "@nextui-org/react";
import {SingInButton} from "@/components/NavBar/USettings/SignIn/SingInButton";
import {useSession} from "next-auth/react";
import {UserAccount} from "@/components/NavBar/USettings/UserAccount";

export function UserSettings() {
    const {data, status} = useSession();

    if (status == "loading") {
        return <NavbarItem>
            <p>Loading...</p>
        </NavbarItem>
    }

    if ((status == "unauthenticated") || !data) {
        return <NavbarItem>
            <ThemeSwitcher />
            <SingInButton />
        </NavbarItem>
    }

    return <NavbarItem>
        <UserAccount />
    </NavbarItem>
}