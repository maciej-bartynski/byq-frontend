import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import defaultCss from './LabelNumber.module.css';
import { forwardRef } from "react";

const LabelNumber = forwardRef<HTMLSpanElement, {
    className?: string,
    value: number,
    toFixed?: number,
    iconName?: string,
}>(({
    className,
    value,
    toFixed = 0,
    iconName = 'fa-percent'
}, ref) => {
    const resolvedRootClassName = stringsConcatWithSpace(defaultCss.root, className);
    return (
        <span className={resolvedRootClassName} ref={ref}>
            <span className={defaultCss.label}>
                {value.toFixed(toFixed)}
            </span>
            <span className={defaultCss.icon}>
                <i className={`fas ${iconName}`} />
            </span>
        </span>
    )
})

export default LabelNumber;