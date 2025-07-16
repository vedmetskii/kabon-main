import { ClientOptions } from "better-auth";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

const authOptions: ClientOptions = {
    fetchOptions: {
        auth: auth.handler,
    }
}

const authClient = createAuthClient(authOptions);

const { useSession, signUp, signIn, signOut } = authClient;

async function createUser(email: string, password: string, name: string): Promise<string | null> {
    const { data, error } = await signUp.email({
        email: email,
        password: password,
        name: name,
    })

    if (error) {
        console.log(error)
        return null
    }

    if (!data?.token) return null;

    const { token } = data;

    return token
}

async function mySignIn(email: string, password: string) {
    const { data, error } = await signIn.email({
        email: email,
        password: password
    })

    console.log(data);
    console.log(error);
    return {data, error}
}

export {useSession, createUser, mySignIn as signIn, signOut}
