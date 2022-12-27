import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import defaultCss from './FlexCentered.module.css';
import { forwardRef, PropsWithChildren } from "react";

const FlexCentered = forwardRef<HTMLDivElement, PropsWithChildren<{
    row?: boolean,
    className?: string,
    gap?: number,
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch',
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch',
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>>(({
    children,
    className,
    justifyContent = 'flex-start',
    alignItems = 'center',
    gap = 'unset',
    row = true,
}, ref) => {
    const resolvedRootClassName = stringsConcatWithSpace(defaultCss.root, className);
    return (
        <div
            ref={ref}
            className={resolvedRootClassName}
            style={{
                flexDirection: row ? 'row' : 'column',
                justifyContent,
                alignItems,
                gap,
            }}
        >
            {children}
        </div>
    )
})

export default FlexCentered