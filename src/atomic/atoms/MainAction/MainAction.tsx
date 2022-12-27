import { FC, MouseEventHandler, ReactNode } from 'react';
import defaultCss from './MainAction.module.css';

const MainAction:FC<{
    icon: ReactNode,
    title?: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    type?: 'button' | 'submit' | 'reset',
    className?: string
}> = ({
    icon,
    title,
    onClick,
    type = 'button',
    className
}) => {

    const allClassNames = `${defaultCss.root} ${className ||""}`.trim();

    return (
        <button
            className={allClassNames}
            onClick={onClick}
            title={title}
            type={type}
        >
            {icon}
        </button>
    )
}

export default MainAction;