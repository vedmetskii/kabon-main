import { siteConfig } from "@/config/site";

const getPosts = async (
    {pageId }: { pageId: number }): 
    Promise<{ posts: Post[], maxPages: number }> => {
    const response = await fetch(`/api/posts?page=${pageId}`);
    const responseMaxPages = await fetch(`/api/posts?maxPages=true`);
    const dataJson: string = await response.json()
    const maxPagesJson = await responseMaxPages.json()
    const data: Post[] = JSON.parse(dataJson)
    const maxPages = JSON.parse(maxPagesJson).maxPages
    return {
        maxPages: maxPages,
        posts: data
    }
}


const getPostsBySearch = async (
    { pageId, search }: { pageId: number, search: string }): 
    Promise<{ posts: Post[], maxPages: number }> => {
    const response = await fetch(`/api/posts?page=${pageId}&search=${search}`);
    const responseMaxPages = await fetch(`/api/posts?maxPages=true&search=${search}`);
    const dataJson: string = await response.json()
    const maxPagesJson = await responseMaxPages.json()
    const data: Post[] = JSON.parse(dataJson)
    const maxPages = JSON.parse(maxPagesJson).maxPages
    return {
        maxPages: maxPages,
        posts: data
    }
}

const getPost = async (id: string) => {
    const apiUrl = siteConfig.apiUrl;
    console.log(`${apiUrl}/api/posts/${id}`)
    const response = await fetch(
        `${apiUrl}/api/posts/${id}`,
        {
            next: {
                revalidate: 30,
            }
        }
    );
    const dataJson = await response.json()
    const data: Post = JSON.parse(dataJson);
    const status = JSON.parse(dataJson).status;
    return [data, status]
}

const createPost = async ({ title, mainImage, content }: Post) => {
    const response = await fetch(
        '/api/posts/create',
        {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                mainImage: mainImage,
                content: content
            })
        }
    )
    const dataJson = await response.json()
    const data = JSON.parse(dataJson)
    return data.code
}



export { getPosts, getPost, createPost ,getPostsBySearch }