import { getProduct } from '@/api/products'
import { Stars } from '@/components/product-card'
import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router'
// shadcn
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'


export const Route = createFileRoute('/store/$productId')({
    component: ProductPage,
    loader: ({ params: { productId } }) => getProduct(+productId)
})

function ProductPage() {
    const data = useLoaderData({ from: Route.fullPath })

    console.log(data)

    return <section>
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 pt-6 md:pt-10">
                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                    <img src="/src/assets/hot drinks.jpg" alt={data.name} className='h-[400px] md:h-[600px]' />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                    <h2 className="scroll-m-20 border-b pb-2 text-4xl lg:text-5xl font-semibold tracking-tight first:mt-0">
                        {data.name}
                    </h2>
                    <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                        <p className="text-2xl font-semibold sm:text-3xl">
                            ${data.price}
                        </p>

                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <Stars stars={5} />
                            <p className="text-sm font-medium leading-none">
                                ({data.stars})
                            </p>
                            <a
                                href="#"
                                className="text-sm font-medium leading-none underline hover:no-underline"
                            >
                                {data.people} Reviews
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 gap-2 sm:items-center flex sm:mt-8">
                        <Button asChild>
                            <Link to="/store" >
                                <ShoppingCartIcon className='mr-2 h-4 w-4' />
                                Añadir al carrito
                            </Link>
                        </Button>

                        <Button variant="outline" size="icon" asChild>
                            <Link to="/store" >
                                <HeartIcon className='h-4 w-4' />
                            </Link>
                        </Button>
                    </div>

                    <Separator className='my-10' />

                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {data.desc}
                    </p>
                </div>
            </div>
        </div>
    </section>
}
