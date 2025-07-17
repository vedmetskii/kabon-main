import {SignIn} from "@/components/NavBar/USettings/SignIn";

export default function SingInPage({searchParams}: {searchParams: {callbackUrl: string}}) {
    const callbackUrl = searchParams.callbackUrl ?? "/"

    return <SignIn callbackUrl={callbackUrl}/>
}