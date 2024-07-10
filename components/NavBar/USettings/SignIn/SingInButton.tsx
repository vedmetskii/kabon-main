"use client";

import {Button} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";

export function SingInButton() {
    const router = useRouter()
    const path = usePathname()
    return <Button
        onClick={() => router.push(`/user/signin?callbackUrl=${path}`)}
        variant="flat"
    >Sing In</Button>
}