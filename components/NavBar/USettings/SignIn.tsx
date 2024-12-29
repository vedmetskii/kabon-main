"use client"
import {useDisclosure} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {SignInModalError} from "@/components/NavBar/USettings/SignIn/SignInModalError";
import {SignInFrom} from "@/components/NavBar/USettings/SignIn/SignInForm";

export function SignIn({callbackUrl}:{callbackUrl: string}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const router = useRouter()

    async function signInUser(formData: FormData) {

        if (res && !res.error) {
            router.push(callbackUrl)
            return
        }

        if (res && res.error == "CredentialsSignin") {
            onOpen()
            return
        }
    }

    return <>
        <SignInFrom action={signInUser} />
        <SignInModalError onOpenChange={onOpenChange} isOpen={isOpen} />
    </>
}
