import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { ProductCardHorizontal } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Sort } from "./store";
import { useProducts } from "@/queries/products";

export const Route = createLazyFileRoute("/_public/")({
    component: Index,
});

function Index() {
    return (
        <main className="relative mx-auto flex h-[calc(100vh-100px)] max-w-screen-xl flex-col justify-around px-10">
            <header className="mt-4 grid justify-between md:grid-cols-2">
                <div className="mx-auto mt-12 text-center md:max-w-[500] md:text-left">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        Tu{" "}
                        <span className="underline-offset-3 underline decoration-primary/80 decoration-8 dark:decoration-primary">
                            felicidad
                        </span>{" "}
                        en una sola taza de café
                    </h1>
                    <p className="leading-7 opacity-70 [&:not(:first-child)]:mt-6">
                        El café es la mejor parte de despertarse.
                    </p>
                    <Button size="sm" className="my-8 sm:my-10">
                        <Link to="/store">¡Ordena ya!</Link>
                    </Button>
                </div>
                <div className="relative flex items-center justify-center">
                    <img
                        src="home-img.svg"
                        alt="logo"
                        className="z-20 mx-auto h-[24rem] w-[24rem] md:h-[30rem] md:w-[30rem]"
                    />
                    <div className="absolute z-0 h-[80%] w-[80%] bg-[radial-gradient(circle_at_center,#4d3917_0%,transparent_60%)]">
                        {" "}
                    </div>
                </div>
            </header>
            <section className="mx-auto mt-2 w-full">
                <PopularProducts />
            </section>
        </main>
    );
}

function PopularProducts() {
    const { data: products } = useProducts({ limit: 4, sort: Sort.newest })

    return (
        <>
            <h2 className="mb-6 px-2 scroll-m-20 text-2xl font-semibold tracking-tight opacity-90 first:mt-0">
                Ultimos Productos
            </h2>
            <div className="mb-10 flex gap-8 overflow-x-hidden">
                {products && products.map((product) => (
                    <ProductCardHorizontal key={product.id} {...product} />
                ))}
            </div>
        </>
    );
}
