import { useCartStore } from "@/store/cart";
import { Product } from "@/api/products";
//shadcn
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    PlusIcon,
    ShoppingCartIcon,
    TrashIcon,
    WalletIcon,
    XIcon,
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { useCallback } from "react";
import { useCreateSale } from "@/queries/sales";
import { toast } from "sonner";
import { redirect } from "@tanstack/react-router";

export function AddToCartButton({ product }: { product: Product }) {
    const handleAddToCart = useCartStore((s) => s.add);
    return (
        <Button size="sm" onClick={() => handleAddToCart(product)}>
            <ShoppingCartIcon className="mr-2 h-4 w-4" />
            Añadir
        </Button>
    );
}

export function DeleteFromCartButton({ productId }: { productId: number }) {
    const remove = useCartStore((s) => s.remove);
    return (
        <Button size="icon" variant="ghost" onClick={() => remove(productId)}>
            <XIcon className="h-4 w-4" />
        </Button>
    );
}

export function IncreaseCountButton({ product }: { product: Product }) {
    const add = useCartStore((s) => s.add);
    return (
        <Button
            onClick={() => add(product)}
            size="icon"
            variant="outline"
            className="h-6 w-6 rounded-[8px]"
        >
            <PlusIcon className="h-4 w-4" />
        </Button>
    );
}

export function DecreaseCountButton({ productId }: { productId: number }) {
    const remove = useCartStore((s) => s.remove);
    return (
        <Button
            onClick={() => remove(productId)}
            size="icon"
            variant="outline"
            className="h-6 w-6 rounded-[8px]"
        >
            <PlusIcon className="h-4 w-4" />
        </Button>
    );
}

export function RemoveAllFromButton({ productId }: { productId: number }) {
    const removeAllFrom = useCartStore((s) => s.removeAllFrom);
    return (
        <Button
            onClick={() => removeAllFrom(productId)}
            size="icon"
            variant="ghost"
            className="h-6 w-6"
        >
            <TrashIcon className="h-4 w-4" />
        </Button>
    );
}

const fallback = "/store";

export function CartDropdown() {
    const cart = useCartStore((s) => s.cart);
    const count = useCartStore((s) => s.count);
    const total = count();
    const totalPriceFn = useCartStore((s) => s.totalPrice);
    const totalPrice = totalPriceFn();
    const removeAll = useCartStore((s) => s.removeAll);
    const { user } = useAuth();

    const { mutate: createSale } = useCreateSale()

    const handleMakeSale = useCallback(() => {
        if (!user) {
            toast.error("Tienes que estar autenticado")
            throw redirect({
                to: "/login",
                search: { redirect: fallback },
            });
        }

        const products = cart.map(p => ({ id: p.id, amount: p.count }))
        return createSale({ userId: user.sub, products })
    }, [createSale, user, cart]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <ShoppingCartIcon className="h-4 w-4" />
                    {total > 0 && <span className="ml-1"> {total} </span>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Tu Carrito</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cart.map((item) => (
                    <DropdownMenuItem key={item.id}>
                        <div className="flex items-center justify-between gap-4">
                            <p className="w-20"> {item.name} </p>
                            <div className="flex items-center gap-2">
                                <DecreaseCountButton productId={item.id} />
                                {item.count}
                                <IncreaseCountButton product={item} />
                            </div>
                            <p className="font-semibold">${item.price}</p>
                            <RemoveAllFromButton productId={item.id} />
                        </div>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex items-center justify-between">
                    <p> Total </p>
                    <p> $ {totalPrice} </p>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <div className="flex w-full justify-between gap-2">
                        <Button
                            onClick={removeAll}
                            size="sm"
                            variant="outline"
                            className="w-full"
                        >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Limpiar
                        </Button>
                        <Button
                            onClick={handleMakeSale}
                            size="sm"
                            className="w-full"
                        >
                            <WalletIcon className="mr-2 h-4 w-4" />
                            Comprar
                        </Button>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
