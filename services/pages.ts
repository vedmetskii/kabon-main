import { PrismaClient } from "@prisma/client";

const getDataPage = async (api_url: string) => {
    const prisma = new PrismaClient()
    let path: string;
    if (api_url == "/main_page") {
        path = '/'
    } else {
        path = api_url.slice(6)
    }
    const page = await prisma.page.findFirst({
        where: {
            path: path
        }
    })
    if (!page) {
        const data: Page = {
            code: 404,
            content: [
                {
                    type: "",
                    id: NaN,
                    content: "",
                    pageId: null
                }
            ],
            id: NaN,
            title: "",
            path: ""
        }
        return data
    }
    const content = await prisma.pageContent.findMany({
        where: {
            pageId: page?.id
        }
    })

    return { content: content, code: 200, ...page }
}

export { getDataPage }