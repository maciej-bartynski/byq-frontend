import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { createElement, DetailedHTMLProps, forwardRef, PropsWithChildren, ReactHTML } from "react";
import defaultCss from './Layout.module.css';

type CustomProps = PropsWithChildren<{
    as?: keyof ReactHTML
}>

const Route = forwardRef<HTMLDivElement, CustomProps & DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
>>(({
    as = 'div',
    ...props
}, ref) => createElement(as, {
    ...props,
    className: stringsConcatWithSpace(defaultCss.route, props.className),
    ref
}));

export default Route;