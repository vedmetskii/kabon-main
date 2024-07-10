"use client";
import {Button, Input} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "@/components/Icons/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/Icons/EyeFilledIcon";
import {useState} from "react";

export function SignInFrom({action}:{action: (formData: FormData) => void}) {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible);

    return <>
        <form className="" action={action}>
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
    </>
}