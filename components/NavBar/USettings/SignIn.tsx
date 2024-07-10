"use client"
import {Button, Input, useDisclosure} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "@/components/Icons/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/Icons/EyeFilledIcon";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {SignInModalError} from "@/components/NavBar/USettings/SignIn/SignInModalError";

export function SignInForm({callbackUrl}:{callbackUrl: string}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()


    const toggleVisibility = () => setIsVisible(!isVisible);

    async function signInUser(formData: FormData) {
        const res = await signIn('credentials', {
            user: formData.get('username'),
            password: formData.get('password'),
            redirect: false
        })

        if (res && !res.error) {
            router.push(callbackUrl)
        } else if (res && res.error == "CredentialsSignin") {
            onOpen()
        }
    }

    return <>
        <form className="" action={signInUser}>
            <Input
                isClearable
                size="lg"
                type="username"
                name="username"
                label="Username"
                placeholder="Enter your username"
                defaultValue=""
                className="p-4 w-4/5 justify-center ml-auto mr-auto"
                onClear={() => console.log("Input cleared")}
                required
            />
            <Input
                label="Password"
                size="lg"
                placeholder="Enter your password"
                name="password"
                className="p-4 w-4/5 justify-center ml-auto mr-auto"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                        )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                required
            />
            <Button
                className="p-6 w-4/5 justify-center mr-auto ml-auto flex"
                type="submit"
            >
                Submit
            </Button>
        </form>
        <SignInModalError onOpenChange={onOpenChange} isOpen={isOpen} />
    </>
}