"use client"
import {Button} from "@nextui-org/react";
import {createPost} from "@/services/editSite";
import {useState} from "react";

export default function CreatePostPage() {
    const [response, setResponse] = useState()

    const action = async (formData: FormData) => {
        const data = {
            title: "Test new api to create post",
            mainImage: "https://sun9-66.userapi.com/impg/aukOqghGkMVnkRqyVRnm3snzqrhTTjRXOIfS3Q/tmzTS0WOhlQ.jpg?size=1969x1969&quality=96&sign=5358b0e603206b364d75d8ab197d05b3&type=album",
            content: [
                {
                    type: "Handler",
                    content: "Test post"
                }
            ],
        }

        const response = await createPost(data)
        setResponse(response)
    }

    return <form action={action}>
        <Button type="submit">Submit</Button>
    </form>
}