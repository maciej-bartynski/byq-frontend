import { FC, ReactNode } from "react";
import defaultCss from './MainHeader.module.css'

const MainHeader: FC<{
    title: ReactNode,
    description?: ReactNode,
    withMargin?: boolean,
}> = ({
    title,
    description,
    withMargin = false
}) => {
        const resolveClassname = withMargin ? defaultCss.root_withMargin : defaultCss.root;
        return (
            <header className={resolveClassname}>
                <h1 className={defaultCss.title}>
                    {title}
                </h1>
                <div className={defaultCss.description}>
                    {description}
                </div>
            </header>
        )
    }

export default MainHeader