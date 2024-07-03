import { Product } from "@/api/products";
import { create } from "zustand";

export interface CartItem extends Product {
    count: number;
}

type CartStore = {
    cart: CartItem[];
    count: () => number;
    totalPrice: () => number;
    add: (product: Product) => void;
    remove: (id: number) => void;
    removeAllFrom: (id: number) => void;
    removeAll: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    count: () => {
        const { cart } = get();
        if (cart.length)
            return cart
                .map((item) => item.count)
                .reduce((prev, curr) => prev + curr);
        return 0;
    },
    totalPrice: () => {
        const { cart } = get();
        if (cart.length)
            return cart
                .map((item) => item.price)
                .reduce((prev, curr) => prev + curr);
        return 0;
    },
    add: (product: Product) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart);
        set({ cart: updatedCart });
    },
    remove: (id: number) => {
        const { cart } = get();
        const updatedCart = removeCart(id, cart);
        set({ cart: updatedCart });
    },
    removeAllFrom: (id: number) => {
        const { cart } = get();
        const updatedCart = removeAllFrom(id, cart);
        set({ cart: updatedCart });
    },
    removeAll: () => set({ cart: [] }),
}));

function updateCart(product: Product, cart: CartItem[]): CartItem[] {
    const cartItem = { ...product, count: 1 } as CartItem;

    const productOnCart = cart.some((item) => item.id === product.id);
    if (!productOnCart) {
        cart.push(cartItem);
        return cart;
    }

    return cart.map((item) =>
        item.id === product.id
            ? ({ ...item, count: item.count + 1 } as CartItem)
            : item,
    );
}

function removeAllFrom(id: number, cart: CartItem[]): CartItem[] {
    return cart.filter((item) => item.id !== id);
}

function removeCart(id: number, cart: CartItem[]): CartItem[] {
    return cart
        .map((item) => {
            if (item.id === id) return { ...item, count: item.count - 1 };
            return item;
        })
        .filter((item) => item.count > 0);
}
