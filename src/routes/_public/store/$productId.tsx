import { Stars } from "@/components/product-card";
import { createFileRoute, useParams } from "@tanstack/react-router";
// shadcn
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { productOptions } from "@/queries/products";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_public/store/$productId")({
    component: ProductPage,
    loader: ({ context: { queryClient }, params: { productId } }) =>
        queryClient.ensureQueryData(productOptions(+productId)),
});

function ProductPage() {
    const { productId } = useParams({ from: Route.fullPath });
    const { data } = useSuspenseQuery(productOptions(+productId));

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="pt-6 md:pt-10 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
                        <img
                            src="/src/coffee.jpg"
                            alt={data.name}
                            className="h-[400px] md:h-[600px]"
                        />
                    </div>

                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h2 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight first:mt-0 lg:text-5xl">
                            {data.name}
                        </h2>
                        <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                            <p className="text-2xl font-semibold sm:text-3xl">
                                ${data.price}
                            </p>

                            <div className="mt-2 flex items-center gap-2 sm:mt-0">
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

                        <div className="mt-6 flex gap-2 sm:mt-8 sm:items-center">
                            <Button>
                                <ShoppingCartIcon className="mr-2 h-4 w-4" />
                                Añadir al carrito
                            </Button>

                            <Button variant="outline" size="icon" asChild>
                                <HeartIcon className="h-4 w-4" />
                            </Button>
                        </div>

                        <Separator className="my-10" />

                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            {data.desc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
