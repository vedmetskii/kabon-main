import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/services/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const pathOfPage = searchParams.get('path');

    if (pathOfPage) {
        const page = await prisma.page.findFirst({
            where: {
                path: pathOfPage,
            }
        });

        if (!page) {
            return NextResponse.json({ error: 'Page not found!' }, { status: 404 });
        }

        const contentOnPage = await prisma.pageContent.findMany({
            where: {
                pageId: page.id
            }
        })

        return NextResponse.json({content: contentOnPage, ...page});
    }

    const pages = await prisma.page.findMany();

    const newPages = await Promise.all(pages.map(async (page) => {
        const content = await prisma.pageContent.findMany({
            where: {
                pageId: page.id
            }
        })

        return {content: content, ...page}
    }))

    return NextResponse.json(newPages);
}

export async function POST(request: NextRequest) {
    const username = request.nextUrl.username;

    const jsonData = request.json()
    console.log(jsonData)

    console.log(username)
}