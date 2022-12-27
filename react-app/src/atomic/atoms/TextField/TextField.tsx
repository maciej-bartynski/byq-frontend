import { useEffect, useRef } from "react";
import { DOMHelper, Form } from "rsuite";
import defaultCss from './TextField.module.css';

function TextField<T = string>(props: Record<string, any> & { onChange?: (e: T) => void }) {
    const { name, label, accepter, ...rest } = props;
    const groupRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const controlRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const { current: group } = groupRef;
        const { current: label } = labelRef;
        const { current: control } = controlRef;
        if (group && label && control) {
            DOMHelper.addClass(label, defaultCss.label);
            DOMHelper.addClass(group, defaultCss.group);
            DOMHelper.addClass(control, defaultCss.control);
        }
    }, [])

    return (
        <Form.Group controlId={`${name}`} ref={groupRef}>
            <Form.ControlLabel ref={labelRef}>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} ref={controlRef} shouldResetWithUnmount/>
        </Form.Group>
    );
}

export default TextField