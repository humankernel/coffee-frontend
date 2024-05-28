import { Button } from '@/components/ui/button'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <main className='relative h-[calc(100vh-100px)] max-w-screen-xl mx-auto flex flex-col justify-around p-4'>
            <header className='grid grid-cols-1 md:grid-cols-2 mt-4 justify-between'>
                <div className='md:max-w-lg mx-auto text-center md:text-left mt-12'>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        Tu {" "}
                        <span className="underline underline-offset-3 decoration-8 decoration-primary/80 dark:decoration-primary">felicidad</span>
                        {" "} en una sola taza de cafe
                    </h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">El cafe es la mejor parte de despertarse.</p>
                    <Button size="sm" className='my-10'> ☕ Ordenar</Button>
                </div>
                <img src="" alt='logo' className='border w-[24rem] h-[24rem] md:w-[30rem] md:h-[30rem] mx-auto md:mr-0' />
            </header>
            <section className='mt-2 mx-auto w-full px-4'>
                <h2 className='text-md opacity-40 mb-2'>Productos Populares</h2>

                <div className='flex gap-2 w-full overflow-x-hidden'>
                </div>
            </section>
        </main>
    )
}
