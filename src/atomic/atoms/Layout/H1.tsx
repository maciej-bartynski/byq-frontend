import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { createElement, DetailedHTMLProps, forwardRef, PropsWithChildren, ReactHTML } from "react";
import defaultCss from './Layout.module.css';

type CustomProps = PropsWithChildren<{
    as?: keyof ReactHTML
}>

const Header = forwardRef<HTMLDivElement, CustomProps & DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
>>(({
    as = 'h1',
    ...props
}, ref) => createElement(as, {
    ...props,
    className: stringsConcatWithSpace(defaultCss.h1, props.className),
    ref
}));

export default Header;