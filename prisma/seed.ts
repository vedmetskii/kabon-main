import { PrismaClient } from "prisma/prisma-client"

const prisma = new PrismaClient();

async function isPageNotExist(path: string): Promise<boolean> {
    const page = await prisma.page.findFirst({
        where: {
            path: path,
        }
    })

    return !page;
}

async function createPage({path, title}: {path: string, title: string}){
    return prisma.page.create({
        data: {
            path: path,
            title: title
        }
    });
}


async function main() {
    let pathAndTitleOfRequiredPage = [
        {
            path: "/",
            title: "Main Page",
        },
        {
            title: "Sign Out",
            path: "/user/signout"
        },
        {
            title: "News",
            path: "/news"
        },
        {
            title: "User",
            path: "/user"
        },
        {
            title: "Sign In",
            path: "/user/signin"
        }
    ]
    let pages: {path: string, title: string}[] = []

    for (const {path, title} of pathAndTitleOfRequiredPage) {
        const pageIsNotExist = await isPageNotExist(path)
        if (pageIsNotExist) {
            pages.push({
                path: path,
                title: title,
            })
        }
    }

    const newPages = await Promise.all(pages.map(
        async (page) => await createPage(page)
    ))

    console.log(newPages)
}

main()