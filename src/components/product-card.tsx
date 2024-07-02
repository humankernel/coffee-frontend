import { Link } from '@tanstack/react-router'
import { AddToCartButton, FavoriteButton } from '@/components/cart'
// shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { StarIcon } from 'lucide-react'
import { Product } from '@/api/products'

type ProductProps = {
    id: number,
    name: string,
    discount?: number
    stars?: number
    people: number
    price: number
}

export function ProductCard(product: Product) {
    const { id, name, people, stars, discount, price } = product

    return <Card>
        <CardHeader>
            <div className="h-48 w-full">
                <Link
                    to="/store/$productId"
                    params={(prev) => ({ ...prev, productId: id })}
                >
                    <img className="mx-auto h-full" src="/src/assets/hot drinks.jpg" alt={name} />
                </Link>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between gap-4 opacity-60">
                {discount !== 0 &&
                    <span className="me-2 text-xs font-medium">
                        {discount}% descuento
                    </span>}
            </div>

            <Link
                to="/store/$productId"
                params={(prev) => ({ ...prev, productId: id })}
                className="text-lg font-semibold leading-tight hover:underline"
            >
                {name}
            </Link>

            <div className="mt-2 flex items-center gap-2">
                <Stars stars={stars} />
                <p className="text-sm font-medium text-gray-900 dark:text-white"> {stars} </p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({people})</p>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <p className="text-2xl font-extrabold leading-tight"> ${price} </p>

            <div>
                <FavoriteButton productId={id} />
                <AddToCartButton product={product} />
            </div>
        </CardFooter>
    </Card>
}


export function ProductCardHorizontal({
    id,
    name,
    discount,
    stars = 0,
}: ProductProps) {
    return <Card className='flex h-[120px]'>
        <CardContent>
            <div className="h-48 w-full">
                <Link
                    to="/store/$productId"
                    params={(prev) => ({ ...prev, productId: id })}
                >
                    <img className="mx-auto h-[100px] rounded-b" src="/src/assets/hot drinks.jpg" alt={name} />
                </Link>
            </div>
        </CardContent>
        <CardHeader className='pl-0 py-4 flex flex-col justify-between'>
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
                    {discount !== 0 &&
                        <span className="me-2 text-xs font-medium">
                            {discount}% descuento
                        </span>}
                </div>
                <div className='mt-2 flex gap-2 items-center'>
                    <Stars stars={stars} />
                </div>
            </CardDescription>
        </CardHeader>
    </Card>
}

export function Stars({ stars }: { stars: number }) {
    if (stars < 0) stars = 0
    else if (stars > 5) stars = 5

    const active = stars
    const inactive = 5 - stars

    return <div className="flex items-center">
        {Array.from({ length: active }).map((_, idx) =>
            <StarIcon key={idx} className='h-4 w-4 text-yellow-400 fill-yellow-500' />
        )}
        {Array.from({ length: inactive }).map((_, idx) =>
            <StarIcon key={idx} className='h-4 w-4 text-yellow-400' />
        )}
    </div>
}
