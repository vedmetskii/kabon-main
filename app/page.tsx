import { Items } from "@/components/Items";
import { getDataPage } from "@/services/pages";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const dataPage: Page = await getDataPage('/main_page')
  return {
    title: dataPage.title,
  }
}

export default async function Main() {
  const dataPage: Page = await getDataPage("/main_page")
  if (dataPage.code == 404) {
    return <h1>404</h1>
  }
  return <Items items={dataPage.content} />
}