import { Button } from '@/components/ui/button'
import { createLazyFileRoute } from '@tanstack/react-router'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <main className='relative h-[calc(100vh-100px)] max-w-screen-xl mx-auto flex flex-col justify-around p-4 ' >
            <header className='grid grid-cols-1 md:grid-cols-2 mt-4 justify-between'>
                <div className='md:max-w-[500] mx-auto text-center md:text-left mt-12'>
                    <h1 className="mb-4 text-balance text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        Tu {" "}
                        <span className="underline underline-offset-3 decoration-8 decoration-primary/80 dark:decoration-primary">felicidad</span>
                        {" "} en una sola taza de café
                    </h1>
                    <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">El café es la mejor parte de despertarse.</p>
                    <Button size="lg" className='my-10 text-lg'>¡Ordena ya!</Button>
                </div>
                <div className="relative flex justify-center items-center">
                    <img src="src/assets/home-img.svg" alt="logo" className="z-20 w-[24rem] h-[24rem] md:w-[30rem] md:h-[30rem] mx-auto md:mr-0 " />
                    <div className="z-0 absolute bg-[radial-gradient(circle_at_center,#4d3917_0%,transparent_70%)] w-[24rem] h-[24rem] md:w-[30rem] md:h-[30rem] mx-auto md:mr-0"> </div>

                </div>
            </header>
            <PopularsProducts />
        </main>
    )
}

function PopularsProducts() {
    const products = [
        { id: 0, name: "Hot Mocca with Creme", price: 10.00, img: "src/assets/hot drinks.jpg" },
        { id: 1, name: "Hot Mocca with Creme", price: 10.00, img: "src/assets/hot drinks.jpg" },
        { id: 2, name: "Hot Mocca with Creme", price: 10.00, img: "src/assets/hot drinks.jpg" },
    ]

    return <section className='mt-2 mx-auto w-full px-4'>
        <h2 className='text-xl opacity-70 mb-8'>Productos Populares</h2>
        <div className='flex gap-10'>
            {products.map(product =>
                <Card className='flex flex-row-reverse overflow-hidden max-h-32 hover:brightness-90 transition-all cursor-pointer'>
                    <CardHeader className='p-2 pl-4'>
                        <CardTitle className='text-xl'> {product.name} </CardTitle>
                        <CardDescription className='font-semibold text-xl'>${product.price}</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <img src={product.img} alt={product.name} className='w-[12rem]' />
                    </CardContent>
                </Card>
            )}
        </div>
    </section>
}
