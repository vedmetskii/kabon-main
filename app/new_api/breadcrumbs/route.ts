import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/services/prisma";


async function getTitle(path: string) {
    let page;

    if (path.includes("/news/")) {
        page = await prisma.post.findFirst({
            where: {
                id: Number(path.slice(6, path.length)),
            }
        })
    } else {
        page = await prisma.page.findFirst({
            where: {
                path: path
            }
        })
    }

    if (!page) {
        throw new Error("Page not found")
    }

    return page.title
}

function generatePathArray(path: string) {
    let tmp_path = ""

    if (path == "/") {
        return [path]
    }

    return path.split("/").map((partOfPath) => {
        if (tmp_path.at(tmp_path.length-1) != "/") {
            tmp_path += "/"
        }
        tmp_path += `${partOfPath}`

        return tmp_path
    })
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const path = searchParams.get("path")

    if (!path) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    const pathArray = generatePathArray(path)


    try {
        const response = await Promise.all(pathArray.map(async (path) => {
            return {
                title: await getTitle(path),
                path: path
            }
        }))

        return NextResponse.json(response)
    }
    catch (e) {
        return NextResponse.json({ error: `Internal Server Error: ${e}` }, { status: 500 })
    }
}