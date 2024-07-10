import {siteConfig} from "@/config/site"

class Params {
    path: string | undefined
    q: string | undefined

    constructor({path, q}: {path: string | undefined, q: string | undefined}) {
        this.path = path
        this.q = q
    }
}

export const fetchDataFromAPI = async (
    apiUrl: string,
    path: string | undefined = undefined,
    q: string | undefined = undefined
) => {
    const url = new URL(`${siteConfig.proto}://${siteConfig.domain}${apiUrl}`);

    if (path) {
        url.searchParams.set("path", path)
    }

    if (q) {
        url.searchParams.set("q", q)
    }

    const response = await fetch(url)

    const dataJSON = await response.json()

    return JSON.parse(dataJSON)
}

type NavLink = {
    title: string,
    path: string,
    id: number,
    subLinks: {
        title: string,
        path: string,
        id: number,
    }[]
}

export const getNavLinks = async (): Promise<NavLink[]> => {
    return fetchDataFromAPI(
        "/new_api/nav_links",
    );
}

type Breadcrumbs = {
    title: string,
    path: string
}

export const getBreadcrumbs = async ({path}: {path: string}): Promise<Breadcrumbs[]> => {
    return fetchDataFromAPI(
        "/new_api/breadcrumbs",
        path,
    )
}

type Page = {
    id: number,
    path: string,

}

export const getAllPages = async (): Promise<Page[]> => {
    return fetchDataFromAPI(
        "/new_api/pages"
    )
}

export const getPage = async ({path}: {path: string}): Promise<Page> => {
    return fetchDataFromAPI(
        "/new_api/pages",
        path
    )
}