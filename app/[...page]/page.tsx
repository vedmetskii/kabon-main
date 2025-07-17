import { Items } from "@/components/Items";
import { getDataPage } from "@/services/pages";
import { Metadata } from "next";
type Params = {
  page: string[];
  code: number;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let pathToPage = "/pages/";
  for (let i = 0; i < params.page.length - 1; i++) {
    pathToPage += params.page[i] + "/";
  }
  pathToPage += params.page[params.page.length - 1];
  const dataPage: Page = await getDataPage(pathToPage);

  return {
    title: dataPage.title,
  };
}

export default async function CustomPage({ params }: Readonly<Props>) {
  let pathToPage = "/pages/";
  for (let i = 0; i < params.page.length - 1; i++) {
    pathToPage += params.page[i] + "/";
  }
  pathToPage += params.page[params.page.length - 1];
  const dataPage: Page = await getDataPage(pathToPage);
  if (dataPage.code == 404) {
    return 404;
  }
  return <Items items={dataPage.content} />;
}
