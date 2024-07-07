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
    queryParams: Params = {path: undefined, q: undefined}
) => {
    const url = new URL(`${siteConfig.proto}://${siteConfig.domain}${apiUrl}`);

    if (queryParams.path) {
        url.searchParams.set("path", queryParams.path)
    }

    if (queryParams.q) {
        url.searchParams.set("q", queryParams.q)
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
        new Params({path: path, q: undefined})
    )
}