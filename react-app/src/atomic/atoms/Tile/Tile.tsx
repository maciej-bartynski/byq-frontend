import { FC, PropsWithChildren } from "react";
import defaultCss from './Tile.module.css';

const Tile: FC<PropsWithChildren<{
    className?: string;
}>> = ({ children, className, ...rest }) => {
    return (
        <div className={`${defaultCss.root} ${className}`} {...rest}>
            {children}
        </div>
    )
}

export default Tile;