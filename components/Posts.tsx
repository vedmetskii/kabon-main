"use client"
import {getPostsInPage} from "@/services/fetchData"
import {PostCard} from "./Items/Cards"
import useSWR from "swr"
import {Pagination} from "@nextui-org/react"
import {useState} from "react"
import {PostSearch} from "./PostSearch"
import {useRouter} from "next/navigation";

const Posts = ({pageId}: {pageId: number}) => {
    const router = useRouter()
    const { data, isLoading } = useSWR(
        { pageId: pageId, index: "posts" },
        getPostsInPage
    )

    if (!data || isLoading) {
        return <h1>Loading...</h1>
    }

    const maxPages = data.maxPages
    const posts = data.posts

    console.log(maxPages)

    return <>
        <PostSearch pageId={pageId}/>
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-4">
            {posts.map((post) => (
                <PostCard title={post.title} image={post.mainImage} id={post.id} key={post.id} />
            )
            )}

        </div>
        <Pagination
            total={maxPages}
            page={pageId}
            color="secondary"
            onChange={(page) => { router.push(`/news?pageId=${page}`) }}
            className="gap-2 grid grid-cols-1 sm:grid-cols-4 py-4 gap-4 flex-auto"
        />
    </>
}

export { Posts }