import { CircleX, HomeIcon, RefreshCcw } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"

type ErrorProps = {
    error: any,
    reset: () => void,
}

export function ErrorPage({ error, reset }: ErrorProps) {
    return <main className="grid place-items-center h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="flex items-center justify-center mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                    <CircleX className="mr-4 h-12 w-12" /> Ups..
                </h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                    {error instanceof Error ? error.message : "Hay un error."}
                </p>
                <p className="mb-4 mt-10 text-lg font-light text-gray-500 dark:text-gray-400">Quieres intentarlo de nuevo? </p>

                <div className="flex gap-2 justify-center">
                    <Button size="sm" onClick={reset} asChild>
                        <Link to="/" className="flex">
                            <HomeIcon className="mr-2 w-4 h-4" />
                            Inicio
                        </Link>
                    </Button>
                    <Button size="sm" variant="outline" onClick={reset}>
                        <RefreshCcw className="mr-2 w-4 h-4" />
                        Reintentar
                    </Button>
                </div>

            </div>
        </div>
    </main>
}
