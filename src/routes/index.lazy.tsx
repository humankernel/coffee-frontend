import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/products'
import { ProductCardHorizontal } from '@/components/product-card'
import { Button } from '@/components/ui/button'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <main className='relative h-[calc(100vh-100px)] max-w-screen-xl mx-auto flex flex-col justify-around px-10'>
            <header className='grid md:grid-cols-2 mt-4 justify-between'>
                <div className='md:max-w-[500] mx-auto text-center md:text-left mt-12'>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        Tu {" "}
                        <span className="underline underline-offset-3 decoration-8 decoration-primary/80 dark:decoration-primary">felicidad</span>
                        {" "} en una sola taza de café
                    </h1>
                    <p className="leading-7 opacity-70 [&:not(:first-child)]:mt-6">
                        El café es la mejor parte de despertarse.</p>
                    <Button size="sm" className='mt-10'>
                        <Link to="/store/" >
                            ¡Ordena ya!
                        </Link>
                    </Button>
                </div>
                <div className="relative flex justify-center items-center">
                    <img src="src/assets/home-img.svg" alt="logo" className="z-20 w-[24rem] h-[24rem] md:w-[30rem] md:h-[30rem] mx-auto" />
                    <div className="z-0 absolute bg-[radial-gradient(circle_at_center,#4d3917_0%,transparent_60%)] w-[80%] h-[80%]"> </div>
                </div>
            </header>
            <PopularProducts />
        </main>
    )
}

function PopularProducts() {
    const { data } = useQuery({
        queryKey: ['popular-products'],
        queryFn: () => getProducts({ limit: 5, sort: "newest" })
    })

    return <section className='mt-2 mx-auto w-full px-4'>
        <h2 className="scroll-m-20 mb-6 text-3xl font-semibold tracking-tight first:mt-0 opacity-90">
            Productos Populares
        </h2>
        <div className='flex gap-10 mb-10'>
            {data && data.map(product =>
                <ProductCardHorizontal
                    key={product.id}
                    {...product}
                />
            )}
        </div>
    </section>
}
