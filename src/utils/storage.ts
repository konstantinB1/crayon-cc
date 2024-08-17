export const cartBoundsKey = "cartBounds";

export function getCartBounds(): DOMRect | null {
    const bounds = window.localStorage.getItem(cartBoundsKey);

    if (!bounds) {
        return null;
    }

    return JSON.parse(bounds);
}

export function setCartBounds(bounds: DOMRect) {
    window.localStorage.setItem(cartBoundsKey, JSON.stringify(bounds));
}
