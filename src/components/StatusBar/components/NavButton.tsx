import { Button } from "@mui/material";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

export type NavButtonProps = {
    children: ReactNode;
    to: LinkProps["to"];
};

export default function NavButton({ children, to }: NavButtonProps) {
    return (
        <Link to={to}>
            <Button
                size="small"
                sx={{
                    height: 40,
                }}
            >
                {children}
            </Button>
        </Link>
    );
}
