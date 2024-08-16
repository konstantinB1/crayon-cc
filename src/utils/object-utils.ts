// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getByPath = <T extends { [key: string]: any }>(
    obj: T,
    path: string,
) => path.split(".").reduce<T>((acc, key) => acc[key], obj as T);
