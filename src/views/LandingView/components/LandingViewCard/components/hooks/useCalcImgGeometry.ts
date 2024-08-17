import { getCartBounds } from "@/utils/storage";
import { RefObject, useCallback } from "react";

export default function useCalcImgGeometry(
    imgRef: RefObject<HTMLImageElement>,
) {
    return useCallback(
        (skip: boolean) => {
            if (skip) {
                return;
            }

            const cartBounds = getCartBounds();
            const img = imgRef.current;

            if (!img || !cartBounds) {
                return;
            }

            const imgRect = img.getBoundingClientRect();

            return {
                initialPosition: {
                    left: imgRect.left,
                    right: imgRect.right,
                    top: imgRect.top,
                    bottom: imgRect.bottom,
                },
                x:
                    cartBounds.left +
                    cartBounds.width / 2 -
                    (imgRect.left + imgRect.width / 2),
                y:
                    cartBounds.top +
                    cartBounds.height / 2 -
                    (imgRect.top + imgRect.height / 2),
            };
        },
        [imgRef],
    );
}
