export function Handler({ children }: Readonly<{ children: React.ReactNode }>) {
    return <h1 className="text-3xl">
        <strong>
            {children}
        </strong>
    </h1>
}