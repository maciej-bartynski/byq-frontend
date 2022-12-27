import { FC } from 'react';
import defaultCss from './Alert.module.css';
import { Tooltip, Whisper } from 'rsuite';

const Alert: FC<{
    message?: string;
    variant?: 'red' | 'yellow'
}> = ({ message, variant = 'red' }) => {
    const bgClassname = variant === 'red'
        ? defaultCss.bgRed
        : defaultCss.bgYellow;

    const className = `${defaultCss.root} ${bgClassname}`;
    if (message) {
        return (
            <Whisper
                trigger="hover"
                placement='auto'
                speaker={
                    <Tooltip>{message}</Tooltip>
                }
            >
                <div className={className}>!</div>
            </Whisper>
        )
    }
    return (
        <div className={className}>!</div>
    )
}

export default Alert;