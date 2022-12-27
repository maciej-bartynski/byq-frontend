import { FC, PropsWithChildren } from "react";
import defaultCss from './MainColorText.module.css';

const MainColorText: FC<PropsWithChildren> = ({ children }) => (
    <span className={defaultCss.strongTitle}>
        {children}
    </span>
)

export default MainColorText;