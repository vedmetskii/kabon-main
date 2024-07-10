import { AuthOptions, User } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"

const prisma = new PrismaClient()
const prismaAdapter = PrismaAdapter(prisma)

const config: AuthOptions = {
    adapter: prismaAdapter,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/user/signin',
        signOut: '/user/signout',
        error: '/admin/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
    },
    providers: [
        CredentialsProvider({
            credentials: {
                user: { label: "User", type: "user" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.user || !credentials?.password) return null

                const currentUser = await prisma.user.findFirst({
                    where: {
                        name: credentials.user
                    }
                })

                if (currentUser && currentUser.password == credentials.password) {
                    const { password, ...userWithoutPass } = currentUser

                    return userWithoutPass as User
                }

                return null
            },
        }),
    ],
    secret: process.env.AUTH_SECRET
}

export {config}
