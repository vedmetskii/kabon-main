"use client"

import { AddContent } from "@/components/admin/AddContent"
import { Button, Input } from "@nextui-org/react"
import { useMemo, useState } from "react"

export default function CreateNewPage() {
    const [content, setContent] = useState([
        {
            type: '',
            content: ''
        }
    ])
    const [title, setTitle] = useState('')
    const [path, setPath] = useState('')
    
    
    const isInvalidTitle = useMemo(() => {
        if (title == "") {
            return true
        }
        return false
    }, [title])

    const isInvalidMainImage = useMemo(() => {
        if (path == "") {
            return true
        }
        return false
    }, [path])
    return <>
        <h1>Page for create new Page</h1>
        <form>
            <Input
                name="title"
                label="Title"
                value={title}
                className="p-4 w-100% justify-center ml-auto mr-auto"
                onValueChange={setTitle}
                isInvalid={isInvalidTitle}
                errorMessage={isInvalidTitle && "Is invalid!!!"}
            />
            <Input
                name="path"
                label="Path"
                value={path}
                className="p-4 w-100% justify-center ml-auto mr-auto"
                onValueChange={setPath}
                isInvalid={isInvalidMainImage}
                errorMessage={isInvalidMainImage && "Is invalid!!!"}
                color={isInvalidMainImage ? "danger" : "default"}
            />
            <Button
                size="lg"
                onClick={() => {
                    content.push({ type: "", content: "" })
                }}
                className="p-4 w-5/6 justify-center mx-auto my-2"
            >
                Add content
            </Button>
            <Button
                size="lg"
                type="submit"
                className="p-4 w-5/6 justify-center mx-auto my-2"
            >
                Save
            </Button>
            <AddContent content={content} setContent={setContent} />
        </form>

    </>
}