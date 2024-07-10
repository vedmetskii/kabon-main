import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/services/prisma";
import {siteConfig} from "@/config/site";

async function getPostContent(postId: number) {
    return prisma.content.findMany({
        where: {
            postId: postId,
        }
    })
}

async function getPostById(postId: number) {
    const post = await prisma.post.findFirst({
        where: {
            id: Number(postId),
        }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    const contentOfPost = await getPostContent(post.id)

    return {content: contentOfPost, ...post}
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const postId = searchParams.get("id");

    if (postId) {
        try {
            const post = getPostById(Number(postId))
            return NextResponse.json(JSON.stringify(post))
        }
        catch (e) {
            console.log(e)
            return NextResponse.error()
        }
    }

    const pageId = searchParams.get("pageId")

    const posts = await prisma.post.findMany()

    const postsWithContent = await Promise.all(posts.map(
        async (post) => {
            const contentOfPost = await getPostContent(post.id)
            return {content: contentOfPost, ...post}
        }
    ))

    const sortedPosts = postsWithContent.reverse()

    const publishedPosts = sortedPosts.filter(
        (post) => post.published
    )

    if (!pageId) {
        return NextResponse.json(JSON.stringify(publishedPosts))
    }

    return NextResponse.json(JSON.stringify({
        posts: publishedPosts.slice(
            siteConfig.maxPostsOnPageNews * (Number(pageId) - 1),
            siteConfig.maxPostsOnPageNews * Number(pageId)
        ),
        maxPages: Math.ceil(publishedPosts.length / siteConfig.maxPostsOnPageNews),
    }))
}