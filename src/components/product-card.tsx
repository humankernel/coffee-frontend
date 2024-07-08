import { Link } from "@tanstack/react-router";
import { AddToCartButton } from "@/components/cart";
// shadcn
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Product } from "@/api/products";

type ProductProps = {
    id: number;
    name: string;
    discount?: number;
    stars?: number;
    people: number;
    price: number;
};

export function ProductCard(product: Product) {
    return (
        <Card>
            <CardHeader>
                <div className="h-48 w-full">
                    <Link to="/store/$productId" params={{ productId: product.id }} >
                        <img
                            className="mx-auto h-full"
                            src="/coffee.jpg"
                            alt={product.name}
                        />
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between gap-4 opacity-60">
                    {product.discount !== 0 && (
                        <span className="me-2 text-xs font-medium">
                            {product.discount}% descuento
                        </span>
                    )}
                </div>

                <Link
                    to="/store/$productId"
                    params={{ productId: product.id }}
                    className="text-lg font-semibold leading-tight hover:underline"
                >
                    {product.name}
                </Link>

                <div className="mt-2 flex items-center gap-2">
                    <Stars stars={product.stars} />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {" "}
                        {product.stars}{" "}
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        ({product.people})
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="text-2xl font-extrabold leading-tight">
                    {" "}
                    ${product.price}{" "}
                </p>

                <div>
                    <AddToCartButton product={product} />
                </div>
            </CardFooter>
        </Card>
    );
}

export function ProductCardHorizontal({
    id,
    name,
    discount,
    stars = 0,
}: ProductProps) {
    return (
        <Card className="flex">
            <CardContent>
                <Link
                    to="/store/$productId"
                    params={{ productId: id }}
                >
                    <img
                        className="h-[100px] w-[100px] rounded-b-sm hover:shadow-2xl max-w-[100px]"
                        src="coffee.jpg"
                        alt={name}
                    />
                </Link>
            </CardContent>
            <CardHeader className="flex flex-col justify-between py-4 pl-0">
                <CardTitle>
                    <Link
                        to="/store/$productId"
                        params={(prev) => ({ ...prev, productId: id })}
                        className="text-lg font-semibold leading-tight hover:underline"
                    >
                        {name}
                    </Link>
                </CardTitle>
                <CardDescription>
                    <div className="flex items-center justify-between gap-4 opacity-60">
                        {discount !== 0 && (
                            <span className="me-2 mr-0 text-xs font-medium">
                                {discount}% descuento
                            </span>
                        )}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <Stars stars={stars} />
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export function Stars({ stars }: { stars: number }) {
    if (stars < 0) stars = 0;
    else if (stars > 5) stars = 5;

    const active = stars;
    const inactive = 5 - stars;

    return (
        <div className="flex items-center">
            {Array.from({ length: active }).map((_, idx) => (
                <StarIcon
                    key={idx}
                    className="h-4 w-4 fill-yellow-500 text-yellow-400"
                />
            ))}
            {Array.from({ length: inactive }).map((_, idx) => (
                <StarIcon key={idx} className="h-4 w-4 text-yellow-400" />
            ))}
        </div>
    );
}
