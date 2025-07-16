"use client"
import {useDisclosure} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {SignUpModalError} from "@/components/NavBar/USettings/SignUp/SignUpModalError";
import {SignUpFrom} from "@/components/NavBar/USettings/SignUp/SignUpForm";
import { createUser, signIn } from "@/utils/auth-client";

export function SignUp({callbackUrl}:{callbackUrl: string}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const router = useRouter()

    async function signUpUser(formData: FormData) {
        const email = formData.get("email");
        const password = formData.get("password");
        const name = formData.get("name");
        if (!email || !password || !name) {
            return
        }
        const strEmail = String(email);
        const strPass = String(password);
        const strName = String(name);
        const token = await createUser(strEmail, strPass, strName);

        if (!token) {
            onOpen()
            return
        }

        if (token) {
            router.push(callbackUrl)
            return
        }
    }

    return <>
        <SignUpFrom action={signUpUser} />
        <SignUpModalError onOpenChangeAction={onOpenChange} isOpen={isOpen} />
    </>
}
