import {siteConfig} from "@/config/site";

export const pushDataToAPI = async (apiUrl: string, data: any) => {
    const url = new URL(`${siteConfig.proto}://${siteConfig.domain}:${siteConfig.port}${apiUrl}`)

    const response = await fetch(
        url,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        }
    )

    console.log()

    return await response.json()
}
export const createPost = async (data: {
    title: string,
    mainImage: string,
    content: {type: string, content: string}[]
}) => {
    return await pushDataToAPI("/new_api/posts", data)
}