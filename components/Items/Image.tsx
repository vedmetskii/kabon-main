'use client';
import { Image as NextUIImage } from "@nextui-org/react"
import { useState } from "react";


export function Image({src, alt}: Readonly<{src: string, alt: string}>) {
    const [isLoading, setIsLoading] = useState(true)
    return <NextUIImage src={src} width={100} height={100} alt={alt} isLoading={isLoading} onLoad={() => setIsLoading(false)}/>
}