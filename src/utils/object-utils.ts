// Supports only object paths
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getByPath = <T extends { [key: string]: any }>(
    obj: T,
    path: string,
) => path.split(".").reduce<T>((acc, key) => acc[key], obj as T);

export const omit = <T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[],
) => {
    const copy = { ...obj };

    keys.forEach((key) => {
        delete copy[key];
    });

    return copy;
};

export const randomNumber = (max: number) => Math.floor(Math.random() * max);

export const randomItemFromArray = (arr: string[]) =>
    arr[randomNumber(arr.length)];

export const removeSingleItemFromArr = (arr: number[], id: number) => {
    const index = arr.indexOf(id);

    if (index === -1) {
        return arr;
    }

    return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
