import { FC, PropsWithChildren } from "react";
import defaultCss from './Field.module.css';

const Field: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={defaultCss.root}>
            {children}
        </div>
    )
}

export default Field