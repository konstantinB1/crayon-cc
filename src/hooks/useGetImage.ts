import { useEffect, useState } from "react";

export default function useGetImage(image?: string) {
    const [loadedImage, setLoadedImage] = useState<string | null>(null);

    useEffect(() => {
        const img = new Image();

        if (!image) {
            setLoadedImage(process.env.PLACEHOLDER_IMG_URL!);
            return;
        }

        img.onload = () => {
            setLoadedImage(image);
        };

        img.onerror = () => {
            setLoadedImage(process.env.PLACEHOLDER_IMG_URL!);
        };

        img.src = image;
    }, [image]);

    return loadedImage;
}
