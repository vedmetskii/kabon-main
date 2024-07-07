import { AuthProvider } from "@/components/admin/AuthProvider";
import { Navigation } from "@/components/admin/Navigation";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Kabon admin panel"
}

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <AuthProvider>
        <Navigation />
        <main className="mx-10 my-4">{children}</main>
    </AuthProvider>
}