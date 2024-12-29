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

    const path = `/${pathAsArray.join('/')}`
    const prisma = new PrismaClient()
    const page = await prisma.page.findUnique({
        where: {
            path: path
        }
    })
    if (page) {
        return NextResponse.json(JSON.stringify({code: 200, ...page}))
    }
    return NextResponse.json(JSON.stringify({code: 404}))
}