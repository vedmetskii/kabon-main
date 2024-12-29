import { config } from "@/config/auth";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";

const handler = NextAuth(config);

export { handler as GET, handler as POST };
