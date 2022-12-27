import { FC } from "react";
import defaultCss from "./LoaderTile.module.css";

const LoaderTile:FC<{title: string}> = ({title}) => (
    <div className={defaultCss.root}>
        {title}
    </div>
)

export default LoaderTile;