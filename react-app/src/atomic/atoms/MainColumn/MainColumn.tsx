import { createElement, FC, PropsWithChildren, useMemo } from "react";
import defaultCss from './MainColumn.module.css';

const MainColumn: FC<PropsWithChildren<{
    doubleMargin?: boolean;
    className?: string,
    as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'main' | 'section' | 'header' | 'footer' | 'nav',
}>> = ({
    children,
    className = '',
    as = 'div',
    doubleMargin = false
}) => useMemo(() => createElement(as, {
    children,
    className: `${doubleMargin
        ? defaultCss.root_doubleMargin
        : defaultCss.root}${className ?
            ` ${className}`
            : ""}`
}), [children, className, as, doubleMargin]);

export default MainColumn;