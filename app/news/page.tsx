import { Posts } from "@/components/Posts"
import { getPage } from "@/services/fetchData"
import { Metadata } from "next"


export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage('/news')
    return {
        title: page.title,
    }
  }


export default async function NewsPage(
    {searchParams}: {searchParams: { pageId: string | undefined }}
) {
    let pageId = Number(searchParams.pageId)
    if (isNaN(pageId)) {
        pageId = 1
    }
    return <Posts pageId={pageId}/>
}