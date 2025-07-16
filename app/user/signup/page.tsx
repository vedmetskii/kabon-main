import {SignUp} from "@/components/NavBar/USettings/SignUp";

export default async function SingInPage(props: {searchParams: Promise<{callbackUrl: string}>}) {
    const searchParams = await props.searchParams;
    const callbackUrl = searchParams.callbackUrl ?? "/"

    return <SignUp callbackUrl={callbackUrl}/>
}
