import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{
        id: string
    }>
}

export async function GET(request: NextRequest, props: Props) {
    const params = await props.params;

    const {
        id
    } = params;

    const prisma = new PrismaClient()
    const idAsNum = parseInt(id)
    if (isNaN(idAsNum)) {
        return NextResponse.json(JSON.stringify({ code: 404 }))
    }
    const post: PostWithoutContent | null = await prisma.post.findUnique({
        where: {
            id: idAsNum
        }
    })
    const content: Content[] = await prisma.content.findMany({
        where: {
            postId: idAsNum
        }
    })
    const data = {
        content: content,
        ...post
    }
    return NextResponse.json(JSON.stringify(data))
}