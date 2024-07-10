import {SignInForm} from "@/components/NavBar/USettings/SignIn";
import {NextRequest} from "next/server";

export default function SingInPage({searchParams}: {searchParams: {callbackUrl: string}}) {
    const callbackUrl = searchParams.callbackUrl ?? "/"

    return <SignInForm callbackUrl={callbackUrl}/>
}