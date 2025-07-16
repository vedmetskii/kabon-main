"use client"
import {useDisclosure} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {SignInModalError} from "@/components/NavBar/USettings/SignIn/SignInModalError";
import {SignInFrom} from "@/components/NavBar/USettings/SignIn/SignInForm";
import { signIn } from "@/utils/auth-client";

export function SignIn({callbackUrl}:{callbackUrl: string}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const router = useRouter()

    async function signInUser(formData: FormData) {
        const email = formData.get("email");
        const password = formData.get("password");
        if (!email || !password) {
            return
        }
        const strEmail = String(email);
        const strPass = String(password)
        const { data, error } = await signIn(strEmail, strPass)

        if (error) {
            onOpen()
            return
        }

        if (data) {
            router.push(callbackUrl)
            return
        }
    }

    return <>
        <SignInFrom action={signInUser} callbackUrl={callbackUrl} />
        <SignInModalError onOpenChangeAction={onOpenChange} isOpen={isOpen} />
    </>
}
