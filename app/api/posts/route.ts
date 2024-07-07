import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

export async function GET(request: NextRequest) {
    const prisma = new PrismaClient()
    const postsOnPage = 2
    const pageId = Number(request.nextUrl.searchParams.get("page"))
    const isMaxPages = Boolean(request.nextUrl.searchParams.get("maxPages"))
    const search = request.nextUrl.searchParams.get("search")
    const posts: PostWithoutContent[] = await prisma.post.findMany()
    let data: Post[] = []
    for (const element of posts) {
        if (search) {
            const content = await prisma.content.findMany({
                where: {
                    id: element.id,
                    content: {
                        contains: search
                    }
                }
            })
            if (content) {
                const tmp = {
                    content: content,
                    ...element
                }
                data.push(tmp)
            }
        } else {
            const content = await prisma.content.findMany({
                where: {
                    id: element.id
                }
            })
            const tmp = {
                content: content,
                ...element
            }
            data.push(tmp)
        }
    }
    if (isMaxPages) {
        return NextResponse.json(JSON.stringify({
            maxPages: Math.ceil(data.length / postsOnPage)
        }))
    }
    console.log(data)
    data = data.slice(postsOnPage*(pageId-1), postsOnPage*pageId)
    return NextResponse.json(JSON.stringify(data))
}