"use client";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FormEventHandler, useState } from "react";
import { EyeFilledIcon } from "@/components/Icons/EyeFilledIcon"
import { EyeSlashFilledIcon } from "@/components/Icons/EyeSlashFilledIcon"
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SingInPage() {
    const [isVisible, setIsVisible] = useState(false)
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const searchParams = useSearchParams()
    const router = useRouter()
    const callbackUrl = searchParams.get("callbackUrl") ?? '/admin'

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const res = await signIn('credentials', {
            user: formData.get('username'),
            password: formData.get('password'),
            redirect: false
        })

        if (res && !res.error) {
            router.push(callbackUrl)
        } else if (res && res.error == "CredentialsSignin") {
            onOpen()
        } else {
            console.log('No res')
        }
    }

    const toggleVisibility = () => setIsVisible(!isVisible);

    return <>
        <form className="" onSubmit={handleSubmit}>
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
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Username or password is incorrect</ModalHeader>
                        <ModalBody>
                            <p>Please try again</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}