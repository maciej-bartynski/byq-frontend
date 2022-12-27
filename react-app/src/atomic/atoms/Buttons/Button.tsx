import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { FC } from "react";
import defaultCss from './Button.module.css';
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
    className,
    children,
    ...buttonHtmlAttributes
}) => (
        <button
            className={stringsConcatWithSpace(defaultCss.root, className)}
            {...buttonHtmlAttributes}
            type={buttonHtmlAttributes.type || 'button'}
        >
            {children}
        </button>
    )

export default Button;