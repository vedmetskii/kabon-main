import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type RequestData = {
    title: string,
    mainImage: string,
    content: {
        type: string,
        content: string
    }[]
}

type Props = {
    params: {
        id: string
    }
}

export async function POST(request: NextRequest, { params: { id } }: Props) {
    const prisma = new PrismaClient()
    const dataJson = await request.json()
    const data: RequestData = JSON.parse(dataJson)
    const idAsNum = parseInt(id)
    if (isNaN(idAsNum)) {
        return NextResponse.json(JSON.stringify({ code: 404 }))
    }

    await prisma.content.deleteMany({
        where: {
            postId: idAsNum
        }
    })

    await prisma.post.update({
        where: {
            id: idAsNum
        },
        data: {
            title: data.title,
            mainImage: data.mainImage,
        }
    })

    for (let i = 0; i < data.content.length; i++) {
        await prisma.content.create({
            data: {
                index: i,
                type: data.content[i].type,
                content: data.content[i].content,
                postId: idAsNum
            }
        })
    }
    return NextResponse.json(JSON.stringify({ code: 200 }))
}