"use client"
import { getBreadcrumbs } from "@/services/fetchData";
import {
    Breadcrumbs as NextUIBreadcrumbs,
    BreadcrumbItem as NextUIBreadcrumbItem
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import useSWR from "swr";


export function Breadcrumbs() {
    const path = usePathname()
    const {
        data: items,
        isLoading
    } = useSWR({path: path, index: "breadcrumbs"}, getBreadcrumbs);

    if (isLoading) {
        return <p>Loading...</p>
    } else if (!items) {
        return <p>Error</p>
    }

    return <NextUIBreadcrumbs className="mx-5 my-3">
        {items.map((element) => {
            return <NextUIBreadcrumbItem
                key={element.title}
                href={element.path}
            >
                {element.title}
            </NextUIBreadcrumbItem>
        })}
    </NextUIBreadcrumbs>
}