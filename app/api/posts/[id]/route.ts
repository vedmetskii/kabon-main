import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
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