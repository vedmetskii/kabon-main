import {prisma} from "@/services/prisma";
import {NextRequest, NextResponse} from "next/server";


class Link {
    readonly title: string
    readonly pageId: number
    readonly id: number

    constructor({title, pageId, id}: {title: string, pageId: number, id: number}) {
        this.pageId = pageId
        this.id = id
        this.title = title
    }

    public async getTitleAndPath() {
        return {
            id: this.id,
            title: this.title,
            path: await this.getPath(),
        }
    }

    private async getPath() {
        const page = await prisma.page.findFirst({
            where: {
                id: this.pageId,
            }
        })

        if (!page) {
            throw new Error("Page for link not found")
        }

        return page.path
    }

}

class MainLink extends Link {
    subLinks: Link[];

    constructor(
        {subLinks, title, pageId, id}:{subLinks: Link[], title: string, pageId: number, id: number}
    ) {
        super({title, pageId, id});
        this.subLinks = subLinks
    }

    public async addSubs() {
        const subLinks = await prisma.subNavLink.findMany({
            where: {
                mainLinkId: this.id,
            }
        });

        this.subLinks.push(...subLinks.map(
            (sudLink) => new Link({
                title: sudLink.title,
                pageId: sudLink.pageId,
                id: sudLink.id
            })
        ))
    }
}


function getTitlesOfLinks(navLinks: Link[]) {
    return navLinks.map((link) => {
        return new MainLink(
            {
                subLinks: [
                    link,
                ],
                ...link,
            }
        )
    })
}



async function getNavLinksWithPath(
    navLinks: MainLink[]
) {
    return await Promise.all(navLinks.map(async (link) => {
        return {
            subLinks: await Promise.all(link.subLinks.map(async (subLink) => {
                return subLink.getTitleAndPath()
            })),
            ...await link.getTitleAndPath()
        }
    }))
}


export async function GET(request: NextRequest) {
    try {
        const navLinks = await prisma.mainNavLink.findMany();

        const searchParams = request.nextUrl.searchParams;

        let titlesOfLinks: MainLink[] = getTitlesOfLinks(navLinks.map((link) => {
            return new Link({...link})
        }))

        if (!searchParams.get('withoutSubs')) {
            titlesOfLinks = await Promise.all(titlesOfLinks.map(async (link) => {
                await link.addSubs()
                return link
            }))
        }

        const response = await getNavLinksWithPath(titlesOfLinks);

        return NextResponse.json(response)
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 })
    }
}
