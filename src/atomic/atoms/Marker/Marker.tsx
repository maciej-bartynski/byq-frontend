import { FC, useRef } from 'react';
import defaultCss from './Marker.module.css';
import { Tooltip, Whisper } from 'rsuite';
import * as uuid from 'uuid';
import { MarkerPropsType } from './Marker.type';

const Marker: FC<MarkerPropsType> = ({
    message,
    bgColor = "color-red-alert",
    pulseColor = "color-red-alert",
    size = 10,
    pulse = false
}) => {
        const randomId = useRef(uuid.v4()).current;
        const rootClassName = `random-rootClassname_${randomId}`;
        const bgClassName = `random-bgClassname_${randomId}`;

        const stylesElement = (<style dangerouslySetInnerHTML={{
            __html: `
            .${rootClassName} {
                width: ${size}px;
                height: ${size}px;
            }

            .${bgClassName} {
                background-color: var(--${bgColor});
                width: ${size}px;
                height: ${size}px;
            }

            .${rootClassName}::before {
                content: "";
                display: ${pulse ? "block" : "none"};
                background-color: var(--${pulseColor});
                width: ${size}px;
                height: ${size}px;
            }
        `}} />);

        const rootClassNames = `${rootClassName} ${defaultCss.root}`;
        const bgClassNames = `${bgClassName} ${defaultCss.bg}`;

        if (message) {
            return (
                <Whisper
                    trigger="hover"
                    placement='auto'
                    speaker={
                        <Tooltip>{message}</Tooltip>
                    }
                >
                    <span className={rootClassNames}>
                        <span className={bgClassNames} />
                        {stylesElement}
                    </span>
                </Whisper>
            )
        }
        return (
            <span className={rootClassNames}>
                <span className={bgClassNames} />
                {stylesElement}
            </span>
        )
    }

export default Marker;