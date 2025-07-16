import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient()

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "guest",
                input: false
            }
        }
    },
    plugins: [
        nextCookies()
    ]
})
