
import { Posts } from "@/components/Posts"
import { getDataPage } from "@/services/pages"
import { Metadata } from "next"


export async function generateMetadata(): Promise<Metadata> {
    const dataPage: Page = await getDataPage('/pages/news')
    return {
        title: dataPage.title,
    }
  }


export default async function NewsPage() {
    return <Posts/>
}