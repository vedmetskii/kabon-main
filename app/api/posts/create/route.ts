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


export async function POST(request: NextRequest) {
    const prisma = new PrismaClient()
    const data: RequestData = await request.json()
    const newPost = await prisma.post.create({
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
                postId: newPost.id
            }
        })
    }
    return NextResponse.json(request)
}