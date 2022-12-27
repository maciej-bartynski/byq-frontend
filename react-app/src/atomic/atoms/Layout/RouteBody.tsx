import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { createElement, DetailedHTMLProps, forwardRef, PropsWithChildren, ReactHTML } from "react";
import defaultCss from './Layout.module.css';

type CustomProps = PropsWithChildren<{
    as?: keyof ReactHTML
}>

const RouteBody = forwardRef<HTMLDivElement, CustomProps & DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
>>(({
    as = 'main',
    ...props
}, ref) => createElement(as, {
    ...props,
    className: stringsConcatWithSpace(defaultCss.routeBody, props.className),
    ref
}));

export default RouteBody;