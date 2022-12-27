import { FC, PropsWithChildren } from "react";
import Marker from "../Marker/Marker";
import { MarkerPropsType } from "../Marker/Marker.type";
import defaultCss from './MarkerWithLabel.module.css';

const MarkerWithLabel: FC<PropsWithChildren<MarkerPropsType>> = ({
    children,
    ...markerProps
}) => (
    <span className={defaultCss.root}>
        <span>
            <Marker {...markerProps} />
        </span>
        <span>
            {children}
        </span>
    </span>
)

export default MarkerWithLabel;