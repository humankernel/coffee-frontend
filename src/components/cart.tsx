import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DollarSignIcon, HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon, StoreIcon, TrashIcon, WalletIcon, XIcon } from 'lucide-react'
import { Product } from '@/api/products'

export function FavoriteButton({ productId }: { productId: number }) {
    return <Button size="icon" variant="ghost" onClick={() => { }} >
        <HeartIcon className='h-4 w-4' />
    </Button>
}

export function AddToCartButton({ product }: { product: Product }) {
    const handleAddToCart = useCartStore(s => s.add)
    return <Button size="sm" onClick={() => handleAddToCart(product)} >
        <ShoppingCartIcon className='mr-2 h-4 w-4' />
        Añadir
    </Button>
}

export function DeleteFromCartButton({ productId }: { productId: number }) {
    const remove = useCartStore(s => s.remove)
    return <Button size="icon" variant="ghost" onClick={() => remove(productId)} >
        <XIcon className='h-4 w-4' />
    </Button>
}

export function IncreaseCountButton({ product }: { product: Product }) {
    const add = useCartStore(s => s.add)
    return <Button onClick={() => add(product)} size="icon" variant="outline" className='h-6 w-6 rounded-[8px]'>
        <PlusIcon className='h-4 w-4' />
    </Button>
}

export function DecreaseCountButton({ productId }: { productId: number }) {
    const remove = useCartStore(s => s.remove)
    return <Button onClick={() => remove(productId)} size="icon" variant="outline" className='h-6 w-6 rounded-[8px]'>
        <PlusIcon className='h-4 w-4' />
    </Button>
}

export function RemoveAllFromButton({ productId }: { productId: number }) {
    const removeAllFrom = useCartStore(s => s.removeAllFrom)
    return <Button onClick={() => removeAllFrom(productId)} size="icon" variant="ghost" className='h-6 w-6'>
        <TrashIcon className='h-4 w-4' />
    </Button>
}


export function CartDropdown() {
    const cart = useCartStore(s => s.cart)
    const count = useCartStore(s => s.count)
    const total = count()
    const totalPriceFn = useCartStore(s => s.totalPrice)
    const totalPrice = totalPriceFn()
    const removeAll = useCartStore(s => s.removeAll)

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
                <ShoppingCartIcon className="w-4 h-4" />
                {total > 0 && <span className="ml-1"> {total} </span>}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Tu Carrito</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {cart.map(item =>
                <DropdownMenuItem key={item.id}>
                    <div className='flex justify-between items-center gap-4'>
                        <p className='w-20'> {item.name} </p>
                        <div className='flex items-center gap-2'>
                            <DecreaseCountButton productId={item.id} />
                            {item.count}
                            <IncreaseCountButton product={item} />
                        </div>
                        <p className='font-semibold'>${item.price}</p>
                        <RemoveAllFromButton productId={item.id} />
                    </div>
                </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className='flex items-center justify-between'>
                <p> Total </p>
                <p> $ {totalPrice} </p>
            </DropdownMenuLabel>
            <DropdownMenuItem>
                <div className='flex justify-between gap-2 w-full' >
                    <Button onClick={removeAll} size="sm" variant="outline" className='w-full' >
                        <TrashIcon className='mr-2 h-4 w-4' />
                        Limpiar
                    </Button>
                    <Button size="sm" className='w-full'>
                        <WalletIcon className='mr-2 h-4 w-4' />
                        Comprar
                    </Button>
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu >
}
