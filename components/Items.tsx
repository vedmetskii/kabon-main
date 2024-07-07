import { Handler } from "./Items/Handler"
import { Image } from "./Items/Image"
import { Text } from "./Items/Text"

type Content = {
    type: string,
    content: string,
    id: number,
}

type Props = {
    items: Content[]
}

async function ItemOfPage({ itemData }: Readonly<{ itemData: Content }>) {
    switch (itemData.type) {
        case "Handler":
            return <Handler>{itemData.content}</Handler>
        case "Image":
            return <Image src={itemData.content} alt="" />
        case "Text":
            return <Text>{itemData.content}</Text>
        default:
            return <></>
    }
}

export async function Items({ items }: Readonly<Props>) {
    let page: JSX.Element[] = [];
    for (const element of items) {
        page.push(
            <ItemOfPage itemData={element} />
        )
    }
    return page
}
