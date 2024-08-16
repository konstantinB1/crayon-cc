export const formatPrice = (price: number | string) =>
    Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(price));
