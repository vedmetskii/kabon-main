import {SignIn} from "@/components/NavBar/USettings/SignIn";

export default async function SingInPage(props: {searchParams: Promise<{callbackUrl: string}>}) {
    const searchParams = await props.searchParams;
    const callbackUrl = searchParams.callbackUrl ?? "/"

    return <SignIn callbackUrl={callbackUrl}/>
}