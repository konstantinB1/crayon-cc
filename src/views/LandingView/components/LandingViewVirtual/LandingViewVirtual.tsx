import { Beer } from "@/services/beer/api-beers";
import { forwardRef, RefObject } from "react";
import { FixedSizeGrid } from "react-window";
import LandingViewCard from "../LandingViewCard";

export type LandingViewVirtualProps = {
    beers: Beer[];
};

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
        ref={ref}
        style={{
            paddingTop: 100,
        }}
        {...rest}
    />
));

const LandingViewVirtual = forwardRef<HTMLDivElement, LandingViewVirtualProps>(
    ({ beers }, ref: RefObject<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();

        console.log(rect);

        return (
            <FixedSizeGrid
                style={{
                    marginLeft: 32,
                    marginTop: 30,
                }}
                height={(beers.length * 415) / 2}
                width={rect?.width || 0}
                columnCount={2}
                innerElementType={innerElementType}
                columnWidth={rect?.width / 2}
                rowHeight={415}
                rowCount={beers.length / 2}
            >
                {({ rowIndex, style }) => (
                    <LandingViewCard style={style} data={beers[rowIndex]} />
                )}
            </FixedSizeGrid>
        );
    },
);

export default LandingViewVirtual;
