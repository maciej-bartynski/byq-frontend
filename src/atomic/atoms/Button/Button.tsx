import { FC, ReactNode } from "react";
import defaultCss from './Button.module.css';

export type ButtonProps = {
    title: ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ title, onClick, className, disabled }) => {
    return (
        <button 
            disabled={disabled} 
            className={`${defaultCss.root} ${className || ""}`} 
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button;