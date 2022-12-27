import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { forwardRef } from "react";
import defaultCss from './RangeInput.module.css';

const RangeInput = forwardRef<HTMLDivElement, {
    className?: string,
    value: number,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}>(({
    className,
    value,
    onChange
}, ref) => {
    const resolvedRootClassName = stringsConcatWithSpace(defaultCss.root, className);

    return (
        <div
            ref={ref}
            className={resolvedRootClassName}
        >
            <button
                type="button"
                className={defaultCss.button}
                onClick={() => {
                    const nextValue = value > 1
                        ? value - 1
                        : value;
                    onChange(numberToEventLike(nextValue))
                }}
            >
                <i className="fas fa-minus" />
            </button>
            <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={value}
                onChange={onChange}
                style={{ flex: 1 }}
                className={defaultCss.rangeInput}
            />
            <button
                type="button"
                className={defaultCss.button}
                onClick={() => {
                    const nextValue = value < 100
                        ? value + 1
                        : value;
                    onChange(numberToEventLike(nextValue))
                }}
            >
                <i className="fas fa-plus" />
            </button>
        </div>
    )
})

export default RangeInput

const numberToEventLike = (number: number) => {
    return {
        target: {
            value: `${number}`
        }
    } as React.ChangeEvent<HTMLInputElement>
}