import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { forwardRef } from "react";
import defaultCss from './LabelBank.module.css';

const LabelBank = forwardRef<HTMLSpanElement, PropsLabelBank>(({ name, className }, ref) => {

    const resolvedRootClassName = stringsConcatWithSpace(defaultCss.root, className);

    return (
        <span className={resolvedRootClassName} ref={ref}>
            <span className={defaultCss.icon}>
                <i className='fas fa-bank' />
            </span>
            <span className={defaultCss.label}>
                {name}
            </span>
        </span>
    )
})

export default LabelBank

type PropsLabelBank = {
    name: string,
    className?: string,
}