import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{
        pathAsArray: string[]
    }>
}

export async function GET(req: NextRequest, props: Props) {
    const params = await props.params;

    const {
        pathAsArray
    } = params;

    const prisma = new PrismaClient()
    const path = `/${pathAsArray.join('/')}`
    const page = await prisma.page.findUnique({ where: { path: path } })
    if (!page) {
        return NextResponse.json(JSON.stringify({ code: 404 }))
    }
    const content = await prisma.pageContent.findMany({ where: { pageId: page.id } })
    return NextResponse.json(JSON.stringify({ content: content, ...page }))
}