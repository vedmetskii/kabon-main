const getPosts = async (
    { pageId }: { pageId: number }):
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

export { getPosts }