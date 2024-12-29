import { Posts } from "@/components/Posts"
import { getPage } from "@/services/fetchData"
import { Metadata } from "next"


export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage('/news')
    return {
        title: page.title,
    }
  }


export default async function NewsPage(props: {searchParams: Promise<{ pageId: string | undefined }>}) {
    const searchParams = await props.searchParams;
    let pageId = Number(searchParams.pageId)
    if (isNaN(pageId)) {
        pageId = 1
    }
    return <Posts pageId={pageId}/>
}