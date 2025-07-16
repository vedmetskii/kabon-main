"use client"

import { EditContent } from "@/components/admin/EditContent";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FormEventHandler, useEffect, useMemo, useState, use } from "react";
import { siteConfig } from "@/config/site"

type Props = {
    params: Promise<{ id: string }>
}

export default function CreateNewPost(props: Props) {
    const params = use(props.params);

    const {
        id
    } = params;

    const postId = id
    const apiUrl = siteConfig.apiUrl
    const [title, setTitle] = useState("")
    const [mainImage, setMainImage] = useState("")
    const [content, setContent] = useState([{ type: "", content: "" }])
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [modalInformation, setModalInformation] = useState({ status: 200, message: "" })

    useEffect(() => {
        fetch(`/api/posts/${postId}`)
            .then(response => response.json())
            .then(dataJson => JSON.parse(dataJson))
            .then((post) => {
                setTitle(post.title)
                setMainImage(post.mainImage)
                setContent(post.content)
            })
    }, [apiUrl, postId, setTitle, setMainImage])

    const isInvalidTitle = useMemo(() => {
        return title == ""
    }, [title])

    const isInvalidMainImage = useMemo(() => {
        return mainImage == ""
    }, [mainImage])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        if (isInvalidTitle || isInvalidMainImage) {
            return
        }

        for (const elem of content) {
            if (elem.type == "" || elem.content == "") {
                return
            }
        }

        const response = await fetch(`/api/create_post`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                mainImage: mainImage,
                content: content
            })
        })
        if (response.status == 500 || response.status == 404) {
            setModalInformation({
                status: response.status,
                message: response.statusText
            })
            onOpen()
        }
        const bodyJSON = await response.json()
        const body = await JSON.parse(bodyJSON)
        if (String(body.status).startsWith("4") || String(body.status).startsWith("5")) {
            setModalInformation({
                status: body.status,
                message: body.message
            })
            onOpen()
        }
    }

    return <>
        <h1>Edit post</h1>
        <form className="grid" onSubmit={handleSubmit}>
            <Input
                name="title"
                label="Title"
                required
                className="p-4 w-100% justify-center ml-auto mr-auto"
                value={title}
                onValueChange={setTitle}
                isInvalid={isInvalidTitle}
                errorMessage={isInvalidTitle && "Is invalid!!!"}
                defaultValue={title}
            />
            <Input
                name="mainImage"
                label="Main Image"
                required
                className="p-4 w-100% justify-center ml-auto mr-auto"
                value={mainImage}
                onValueChange={setMainImage}
                isInvalid={isInvalidMainImage}
                errorMessage={isInvalidMainImage && "Is invalid!!!"}
                defaultValue={mainImage}
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
        </form>
        <EditContent
            content={content}
            setContent={setContent}
            postId={Number(id)}
        />
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{modalInformation.status}</ModalHeader>
                        <ModalBody>{modalInformation.message}</ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose} color="danger">Close</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}
