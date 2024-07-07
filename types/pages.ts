type PageContent = {
    type: string,
    id: number,
    content: string,
    pageId: number | null
}


type PageWithoutContent = {
    id: number,
    title: string,
}

type Page = {
    code: number,
    content: PageContent[],
    id: number,
    title: string,
    path: string,
}