import { StateCreator } from "zustand";
import { CombinedStore } from "./types";
import { Beer } from "@/services/beer/api-beers";
import { formatPrice } from "@/utils/price-utils";

export type CheckoutSummary = {
    item: Beer;
    quantity: number;
    itemTotal: string;
}[];

export type CartState = {
    // Map of beer id to quantity
    items?: Map<number, number>;

    // Add a beer to the cart
    add: (id: number, quantity: number) => void;

    // Remove a beer from the cart
    remove: (id: number) => void;

    // Get beer item by id
    getById: (id: number) => number;

    // Get total number of items in the cart
    getTotalItems: () => number;

    // Get CheckoutSummary of cart items
    getCartItems: () => CheckoutSummary;

    // Get total price of all items in the cart
    getTotalPrice: () => string;
};

export const createCartStore: StateCreator<CombinedStore, [], [], CartState> = (
    set,
    get,
) => ({
    items: new Map<number, number>(),
    add: (id, quantity) =>
        set(({ items }) => {
            const next = new Map(items);
            const count = next.get(id) || 0;
            next.set(id, count + quantity);

            return {
                items: next,
                isAddingItem: id,
            };
        }),
    remove: (id) =>
        set(({ items }) => {
            const next = new Map(items);
            const count = next.get(id) || 0;

            next.set(id, count == 0 ? 0 : count - 1);

            return {
                items: next,
            };
        }),

    getById: (id) => get().items?.get(id) || 0,

    getTotalItems: () =>
        Array.from(get().items?.values() || []).reduce(
            (acc, curr) => acc + curr,
            0,
        ),

    getTotalPrice: () =>
        formatPrice(
            Array.from(get().items.entries()).reduce(
                (acc, [id, quantity]) =>
                    acc +
                    (get().beers.find((beer) => beer.id === id)
                        ?.price as number) *
                        quantity,
                0,
            ),
        ),

    getCartItems: (): CheckoutSummary =>
        Array.from(get().items.entries())
            .map(([id, quantity]) => {
                const beer = get().beers.find((beer) => beer.id === id);
                const itemTotal = formatPrice(
                    (beer?.price as number) * quantity,
                );

                return {
                    itemTotal,
                    item: beer,
                    quantity,
                };
            })
            .filter((item) => item.quantity > 0),
});
