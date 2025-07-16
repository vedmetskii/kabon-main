import { PrismaClient } from "prisma/prisma-client"

const prisma = new PrismaClient();

async function getPageId(path: string): Promise<number | null> {
    const page = await prisma.page.findFirst({
        where: {
            path: path,
        }
    })

    if (!page) return null
    return page.id
}

async function getMainLinkId() {}

async function getSubLinkId() {}

async function isLinkNotExist(pageId: number, type: "main" | "sub"): Promise<boolean> {
    switch (type) {
        case "main": return !getMainLinkId();
        case "sub": return !getSubLinkId()
    }
}

async function createPage({path, title}: {path: string, title: string}){
    return prisma.page.create({
        data: {
            path: path,
            title: title
        }
    });
}

async function createMainLink() {

}

async function createLink({ type }: {type: "main" | "sub"}) {
    switch (type) {
        case "main": async () => {await createMainLink()}
    }
}

type SubPage = {
    path: string,
    title: string,
    link: {
        type: "main" | "sub",
        pathMainLinkForSub?: string,
        roles: string[]
    }
}

type NewLink = {
    title: string,
    pageId: number,
    rulesInclude: string[],
    subLinks: {
        title: string,
        pageId: number,
        rulesInclude: string[]
    }[]
}

const pathAndTitleOfRequiredPage: SubPage[] = [
    {
        path: "/",
        title: "Main Page",
        link: {
            type: "main",
            roles: ["guest"]
        }
    },
    {
        title: "Sign Out",
        path: "/user/signout",
        link: {
            type: "main",
            roles: ["guest"]
        }
    },
    {
        title: "News",
        path: "/news",
        link: {
            type: "main",
            roles: ["guest"]
        }
    },
    {
        title: "User",
        path: "/user",
        link: {
            type: "main",
            roles: ["guest"]
        }
    },
    {
        title: "Sign In",
        path: "/user/signin",
        link: {
            type: "main",
            roles: ["guest"]
        }
    },
    {
        title: "Sign Up",
        path: "/user/signup",
        link: {
            type: "main",
            roles: ["guest"]
        }
    }
]

function generateNewLinks(existPages: ExistPage[]) {

}

type ExistPage = {
    pageId: number,
    path: string,
    link: {
        type: "main" | "sub",
        pathMainLinkForSub?: string,
        roles: string[]
    }
}

async function main() {
    let pages: SubPage[] = []
    let existPages: ExistPage[] = []
    let links: NewLink[] = []

    for (const {path, title, link} of pathAndTitleOfRequiredPage) {
        const pageId = await getPageId(path)
        if (pageId) {
            existPages.push({pageId: pageId, path: path, link: link})
            continue
        }
        pages.push({
            path: path,
            title: title,
            link: link
        })
    }

    const newPages = await Promise.all(pages.map(
        async (page) => {
            const newPage = await createPage(page)
            existPages.push({pageId: newPage.id, path: newPage.path, link: page.link})
        }
    ))

    console.log(newPages)
}

main()
