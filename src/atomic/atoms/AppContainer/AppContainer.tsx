import { FC, PropsWithChildren } from "react";
import defaultCss from './AppContainer.module.css';

const AppContainer:FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={defaultCss.root}>
            { children }
        </div>
    )
}

export default AppContainer;