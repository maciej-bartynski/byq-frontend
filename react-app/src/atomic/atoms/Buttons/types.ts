import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
    className?: string;
}> & ButtonHTMLAttributes<HTMLButtonElement>

export type {
    ButtonProps
}