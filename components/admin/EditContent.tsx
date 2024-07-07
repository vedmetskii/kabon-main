"use client"

import { siteConfig } from "@/config/site"
import { Button, Card, CardBody, CardHeader, Select, SelectItem, Textarea } from "@nextui-org/react"
import { FormEventHandler, useEffect, useMemo, useState } from "react"

const typesOfContent = [
    "Handler",
    "Text"
]

const EditContent = ({
    content,
    setContent,
    postId
}: {
    content: { type: any, content: any }[],
    setContent: Function,
    postId: number
}) => {
    console.log(content);
    const [index, setIndex] = useState(0)
    const [contentType, setContentType] = useState(content[index].type)
    const [dataContent, setDataContent] = useState(content[index].content)

    const isInvalidContentType = useMemo(() => {
        if (contentType == "") {
            return true
        }
        return false
    }, [contentType])

    const isInvalidContent = useMemo(() => {
        if (dataContent == "") {
            return true
        }
        return false
    }, [dataContent])

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        let newContent = content
        newContent[index] = {
            type: contentType,
            content: dataContent
        }

        setContent(newContent)
    }

    return <form className="m-4" onSubmit={handleSubmit} name="addContent" >
        <Card>
            <CardHeader>Content</CardHeader>
            <CardBody>
                <Select
                    size="lg"
                    className="p-4 w-4/5 justify-center ml-auto mr-auto"
                    name="id"
                    required
                    label="Id"
                    onChange={(event) => {
                        setIndex(Number(event.target.value))
                    }}
                    defaultOpen={false}
                    defaultSelectedKeys={["0"]}
                >
                    {content.map((contentItem, index) => (
                        <SelectItem key={`${index}`}>{(index + 1).toString()}</SelectItem>
                    ))}
                </Select>
                <Select
                    size="lg"
                    className="p-4 w-4/5 justify-center ml-auto mr-auto"
                    name="type"
                    required
                    label="Type"
                    value={contentType}
                    isInvalid={isInvalidContentType}
                    errorMessage={isInvalidContentType && "Is invalid!!!"}
                    color={isInvalidContentType ? "danger" : "default"}
                    onChange={(event) => {
                        setContentType(event.target.value)
                    }}
                >
                    {typesOfContent.map((typeOfContent) => (
                        <SelectItem key={typeOfContent}>{typeOfContent}</SelectItem>
                    ))}
                </Select>
                <Textarea
                    size="lg"
                    className="p-4 w-4/5 justify-center ml-auto mr-auto"
                    name="content"
                    label="Content"
                    required
                    defaultValue={content.at(index)?.content}
                    isInvalid={isInvalidContent}
                    errorMessage={isInvalidContent && "Is invalid!!!"}
                    color={isInvalidContent ? "danger" : "default"}
                    value={dataContent}
                    onValueChange={setDataContent}
                />
                <div className="inline-flex">
                    <Button
                        size="lg"
                        className="p-4 w-2/6 justify-center mx-auto my-2"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        size="lg"
                        color="danger"
                        className="p-4 w-2/6 justify-center mx-auto my-2"
                        onClick={() => {
                            let id = index
                            let newContent
                            if (content.length <= 2) {
                                if (id == 0) {
                                    newContent = [content.at(1)]
                                } else {
                                    newContent = [content.at(0)]
                                }
                            } else if (id == content.length - 1) {
                                newContent = content.slice(0, id)
                            } else {
                                newContent = content.slice(0, id)
                                newContent.push.apply(newContent, content.slice(id + 1))
                            }

                            setContent(newContent)

                            setIndex(id - 1)
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </CardBody>
        </Card>
    </form >
}

export { EditContent }