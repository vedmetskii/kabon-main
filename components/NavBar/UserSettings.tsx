"use client";

import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import {NavbarItem} from "@nextui-org/react";
import {SignInButton} from "@/components/NavBar/USettings/SignIn/SignInButton";
import {UserAccount} from "@/components/NavBar/USettings/UserAccount";
import { useSession } from "@/utils/auth-client";

export function UserSettings() {
    const {data, error, isPending} = useSession();
    if (isPending) {
        return <NavbarItem>
            <p>Loading...</p>
        </NavbarItem>
    }

    if (error) {
        console.log(error);
        return
    }

    if (!data) {
        return <NavbarItem>
            <ThemeSwitcher />
            <SignInButton />
        </NavbarItem>
    }

    return <NavbarItem>
        <UserAccount />
    </NavbarItem>
}
