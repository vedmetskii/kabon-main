import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: {
        pathAsArray: string[]
    }
}

export async function GET(req: NextRequest, { params: { pathAsArray } }: Props) {
    const prisma = new PrismaClient()
    const path = `/${pathAsArray.join('/')}`
    const page = await prisma.page.findUnique({ where: { path: path } })
    if (!page) {
        return NextResponse.json(JSON.stringify({ code: 404 }))
    }
    const content = await prisma.pageContent.findMany({ where: { pageId: page.id } })
    return NextResponse.json(JSON.stringify({ content: content, ...page }))
}