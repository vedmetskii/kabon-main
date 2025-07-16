import { Providers } from "@/components/Providers";
import "./globals.css"
import { Navigation } from "@/components/NavigationBar";
import React from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <html lang="en">
        <body>
            <Providers>
                <Navigation />
                <main className="mx-10 my-4">
                        {children}
                </main>
            </Providers>
        </body>
    </html>
}
