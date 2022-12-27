import { FC, PropsWithChildren, useEffect } from "react";
import defaultCss from './Overflow.module.css';

type MaxHeightUnit = 'px' | '%' | 'vh';

const Overflow: FC<PropsWithChildren<{
    maxHeight?: number,
    maxHeightUnit?: MaxHeightUnit,
    parentNode: HTMLElement
}>> = ({
    maxHeight = 100,
    maxHeightUnit = '%',
    parentNode,
    children
}) => {
        const resolvedMaxHeight = `${maxHeight}${maxHeightUnit}`;
        overflowStyles.maxHeight = resolvedMaxHeight;

        useEffect(() => {
            const maxHeight = parentNode.offsetHeight;
        })

        return (
            <div
                style={overflowStyles}
                
            >
                {children}
            </div>
        )
    }

export default Overflow;

const overflowStyles = {
    overflow: 'auto',
    maxHeight: '100%'
}