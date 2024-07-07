import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function GET() {
    const prisma = new PrismaClient()
    const page = await prisma.page.findUnique({where: {path: "/"}})
    if (page == null) {
        return NextResponse.json({"code": 404})
    }
    const content = await prisma.pageContent.findMany({where: {pageId: page.id}})
    return NextResponse.json(JSON.stringify({content: content, ...page}))
}