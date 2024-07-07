type Content = {
    type: string,
    id: number,
    content: string,
    postId: number | null
}


type PostWithoutContent = {
    id: number,
    title: string,
    mainImage: string,
}

type Post = {
    content: Content[],
    id: number,
    title: string,
    mainImage: string,
}