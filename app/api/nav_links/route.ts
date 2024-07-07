import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

type SubLink = {
    id: number,
    title: string,
    mainLinkId: number | null
    pageId: number
}

type MainNavLink = {
    id: number,
    title: string,
    pageId: number
}

type NavLink = {
    id: number,
    title: string,
    href: string,
    subLinks: NavLink[]
}


export async function GET() {
    const prisma = new PrismaClient()
    const mainLinks: MainNavLink[] = await prisma.mainNavLink.findMany()
    if (!mainLinks) {
        return NextResponse.json(JSON.stringify({code: 404}))
    }
    let navLinks: NavLink[] = []
    for (const link of mainLinks) {
        const subLinks: SubLink[] = await prisma.subNavLink.findMany({
            where: {
                mainLinkId: link.id,
            }
        })
        let newSubLinks = []
        for (const subLink of subLinks) {
            const page = await prisma.page.findUnique({
                where: {
                    id: subLink.pageId
                }
            })
            newSubLinks.push({
                id: subLink.id,
                href: page?.path ?? '#',
                title: subLink.title,
                subLinks: []
            })
        }
        const page = await prisma.page.findUnique({
            where: {
                id: link.pageId
            }
        })

        navLinks.push({
            subLinks: newSubLinks, 
            href: page?.path ?? '#', 
            id: link.id,
            title: link.title
        })
    }
    return NextResponse.json(JSON.stringify(navLinks))
}