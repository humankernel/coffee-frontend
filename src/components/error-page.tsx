import { CircleX, HomeIcon, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

type ErrorProps = {
    error: any;
    reset: () => void;
};

export function ErrorPage({ error, reset }: ErrorProps) {
    return (
        <main className="grid h-screen place-items-center">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="text-primary-600 dark:text-primary-500 mb-4 flex items-center justify-center text-7xl font-extrabold tracking-tight lg:text-9xl">
                        <CircleX className="mr-4 h-12 w-12" /> Ups..
                    </h1>
                    <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                        {error instanceof Error
                            ? error.message
                            : "Hay un error."}
                    </p>
                    <p className="mb-4 mt-10 text-lg font-light text-gray-500 dark:text-gray-400">
                        Quieres intentarlo de nuevo?{" "}
                    </p>

                    <div className="flex justify-center gap-2">
                        <Button size="sm" onClick={reset} asChild>
                            <Link to="/" className="flex">
                                <HomeIcon className="mr-2 h-4 w-4" />
                                Inicio
                            </Link>
                        </Button>
                        <Button size="sm" variant="outline" onClick={reset}>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Reintentar
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
