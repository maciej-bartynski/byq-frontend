import { FC } from "react";
import defaultCss from './UserLabel.module.css';
import Marker from "../Marker";

const UserLabel: FC<{
    id: string,
    email: string,
    bgColor?: string;
    pulseColor?: string;
    pulse?: boolean;
    message?: string;
}> = ({
    id,
    email,
    bgColor = 'color-controlers',
    pulseColor = 'color-controlers',
    pulse = false,
    message
}) => {
        return (
            <div className={defaultCss.root}>
                <div className={defaultCss.marker}>
                    <Marker
                        size={10}
                        bgColor={bgColor}
                        pulseColor={pulseColor}
                        pulse={pulse}
                        message={message}
                    />
                </div>
                <div className={defaultCss.content}>
                <div className={defaultCss.name}>
                    {email}
                </div>
                <div className={defaultCss.id}>
                    {id}
                </div>
                </div>
            </div>
        )
    }

export default UserLabel;