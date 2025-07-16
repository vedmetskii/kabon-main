"use client";

import {Button} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";

export function SignInButton() {
    const router = useRouter()
    const path = usePathname()
    return <Button
        onPress={() => router.push(`/user/signin?callbackUrl=${path}`)}
        variant="flat"
    >Sing In</Button>
}
