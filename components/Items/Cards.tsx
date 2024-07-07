import { CardHeader as NextUICardHeader, Card as NextUICard, CardBody as NextUICardBody, Button } from "@nextui-org/react";
import { Image } from "@/components/Items/Image"
import { useRouter } from "next/navigation";


function PostCard(
    { title, id, image }:
        Readonly<{ title: string, id: number, image: string }>
) {
    const router = useRouter()
    return <NextUICard key={id} className="py-4 justify-center gap-4 flex-auto" onClick={() => router.push(`/news/${id}`)}>
        <NextUICardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center">
            <Button variant="light" onClick={() => router.push(`/news/${id}`)} className="text-medium">
                {title}
            </Button>
        </NextUICardHeader>
        <NextUICardBody className="overflow-visible py-2 justify-center">
            <Image src={image} alt="Card background" />
        </NextUICardBody>
    </NextUICard>
}


function AdminPostCard(
    { title, id, image }:
        Readonly<{ title: string, id: number, image: string }>
) {
    const router = useRouter()
    return <NextUICard key={id} className="py-4 justify-center gap-4 flex-auto" onClick={() => router.push(`/admin/edit_post/${id}`)}>
        <NextUICardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center">
            <Button variant="light" onClick={() => router.push(`/admin/edit_post/${id}`)} className="text-medium">
                {title}
            </Button>
        </NextUICardHeader>
        <NextUICardBody className="overflow-visible py-2 justify-center">
            <Image src={image} alt="Card background" />
        </NextUICardBody>
    </NextUICard>
}

export { PostCard, AdminPostCard }