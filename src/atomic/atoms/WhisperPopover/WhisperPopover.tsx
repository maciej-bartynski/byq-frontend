import { FC } from "react";
import { Popover, Whisper } from "rsuite";
import { OverlayTriggerInstance, OverlayTriggerProps } from "rsuite/esm/Overlay/OverlayTrigger";

const WhisperPopover: FC<OverlayTriggerProps & React.RefAttributes<OverlayTriggerInstance>> = ({
    children,
    speaker,
    placement = 'bottomStart',
    trigger = 'hover',
    ...rest
}) => {

    return (
        <Whisper
            {...rest}
            trigger={trigger}
            placement={placement}
            speaker={typeof speaker === 'function'
                ? speaker
                : (
                    <Popover>
                        <div>
                            {speaker}
                        </div>
                    </Popover>
                )}
        >
            {typeof children === 'function'
                ? children
                : (
                    <div>
                        {children}
                    </div>
                )
            }
        </Whisper>
    )
}

export default WhisperPopover;