import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"


export async function GET() {
    const prisma = new PrismaClient()
    const pages = await prisma.page.findMany()
    return NextResponse.json(JSON.stringify(pages))
}