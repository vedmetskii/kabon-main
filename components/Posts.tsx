"use client"
import { getPosts } from "@/services/posts"
import { PostCard } from "./Items/Cards"
import useSWR from "swr"
import { Pagination } from "@nextui-org/react"
import { useState } from "react"
import { PostSearch } from "./PostSearch"

const Posts = () => {
    const [pageId, setPageId] = useState(1)
    const { data, isLoading } = useSWR({ pageId: pageId }, getPosts)


    if (!data || isLoading) {
        return <h1>Loading...</h1>
    }

    const posts = data.posts
    const pages = data.maxPages
    return <>
        <PostSearch pageId={pageId}/>
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-4">
            {posts.map((post: Post) => (
                <PostCard title={post.title} image={post.mainImage} id={post.id} key={post.id} />
            )
            )}

        </div>
        <Pagination
            total={pages}
            page={pageId}
            color="secondary"
            onChange={(page) => { setPageId(page) }}
            className="gap-2 grid grid-cols-1 sm:grid-cols-4 py-4 gap-4 flex-auto"
        />
    </>
}

export { Posts }