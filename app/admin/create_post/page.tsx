"use client"

import { AddContent } from "@/components/admin/AddContent";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FormEventHandler, useMemo, useState } from "react";

export default function CreateNewPost() {
    const [title, setTitle] = useState("")
    const [mainImage, setMainImage] = useState("")
    const [content, setContent] = useState([{ type: "", content: "" }])
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [modalInformation, setModalInformation] = useState({ status: 200, message: "" })

    const isInvalidTitle = useMemo(() => {
        if (title == "") {
            return true
        }
        return false
    }, [title])

    const isInvalidMainImage = useMemo(() => {
        if (mainImage == "") {
            return true
        }
        return false
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
        <h1>Create post</h1>
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
        <AddContent
            content={content}
            setContent={setContent}
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