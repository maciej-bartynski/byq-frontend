import { FC, PropsWithChildren, ReactNode, useRef } from "react";
import FieldLabel from "../FieldLabel/FieldLabel";
import defaultCss from './FieldLabelIconic.module.css'

const FieldLabelIconic: FC<PropsWithChildren<{
    icon: ReactNode,
    label: ReactNode,
    theme?: string,
}>> = ({
    icon,
    label,
    children,
    theme = '--color-secondary',
}) => {

        const themeCss = useRef({})
        themeCss.current = theme
            ?
            {
                style: {
                    color: `var(${theme})`,
                }
            }
            : {}

        return (
            <span
                className={defaultCss.root}
                {...themeCss.current}
            >
                <span className={defaultCss.icon}>
                    {icon}
                </span>
                <FieldLabel className={defaultCss.label}>
                    {label}
                </FieldLabel>
                <span className={defaultCss.content}>
                    {children}
                </span>
            </span>
        )
    }

export default FieldLabelIconic;