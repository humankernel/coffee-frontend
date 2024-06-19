import { Button } from "./ui/button"



type ErrorProps = {
    error: any,
    reset: () => void,
}

export function ErrorPage({ error, reset }: ErrorProps) {
    return <main className="grid place-items-center h-screen">
        <div className="flex flex-col gap-10">
            <h1 className="text-2xl">
                Algo Paso
            </h1>
            <p className="font-semibold">
                Error: {error.message}
            </p>
            <img src="src/assets/react.svg" alt="error image" className="w-[20rem] h-[20rem]" />
            <Button onClick={reset}>Reset</Button>
        </div>
    </main>
}
