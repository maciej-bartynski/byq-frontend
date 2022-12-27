import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import defaultCss from './Input.module.css';

type OptionalProps<T> = {
    readOnly: true,
    onTextChange?: (text: T) => void;
    editableLook: ReactNode;
} | {
    readOnly?: undefined,
    onTextChange: (text: T) => void;
    editableLook?: undefined;
}

function Input<T = (string | number | readonly string[] | undefined)>({
    className,
    onTextChange,
    value,
    readOnly,
    variant = 'M',
    editableLook,
    ...rest
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    className?: string;
    value: T;
    variant?: 'S' | 'M' | 'L'
} & OptionalProps<T>): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentValue, setCurrentValue] = useState<T>(value);
    useEffect(() => {
        setCurrentValue(value);
    }, [value])
    const [editMode, changeEditMode] = useState(false);
    const setEditMode = useCallback((editMode: boolean) => {
        if (!readOnly) changeEditMode(editMode);
    }, [changeEditMode, readOnly])

    const variantClassName = `${variant === 'S' ? defaultCss.root_small : ""} ${variant === 'L' ? defaultCss.root_large : ""}`
    const rootClassName = `${defaultCss.root} ${editMode ? defaultCss.root_editMode : ''}`;
    const dirty = value !== currentValue;

    const submit = useCallback(() => {
        onTextChange && onTextChange(currentValue);
        setEditMode(false);
        inputRef.current?.blur();
    }, [onTextChange, currentValue, setEditMode]);

    const abort = useCallback(() => {
        setCurrentValue(value);
        setEditMode(false);
    }, [value, setCurrentValue, setEditMode]);

    const onBlur = useCallback(() => {
        if (!dirty) {
            setCurrentValue(value);
            setEditMode(false);
        }
    }, [setCurrentValue, setEditMode, value, dirty])

    const onFocus: React.FocusEventHandler<HTMLInputElement> = useCallback((e) => {
        setEditMode(true);
        rest.onFocus && rest.onFocus(e);
    }, [setEditMode, rest])

    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') submit();
        if (e.key === 'Escape') abort();
    }, [submit, abort])

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value as unknown as T)
    }, [setCurrentValue])

    const focusInput = useCallback(() => {
        inputRef.current?.focus();
    }, [])

    const hideIconIfReadonly = readOnly && !editableLook;

    return (
        <span className={`${rootClassName} ${variantClassName} ${className || ""}`}>
            <label className={defaultCss.label}>
                <input
                    {...rest}
                    ref={inputRef}
                    className={defaultCss.input}
                    onChange={onChange}
                    value={currentValue as unknown as (string | number | readonly string[] | undefined)}
                    {...(editMode ? parametersPlaceholder : readOnlyParameter)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                />
            </label>
            <span className={defaultCss.actions}>
                {!editMode && !hideIconIfReadonly && (
                    <Button
                        onClick={focusInput}
                        className={defaultCss.actionEdit}
                        title={editableLook || <i className="fa-solid fa-pen" />}
                    />
                )}
                {editMode && (
                    <>
                        {/* <button onClick={submit} className={defaultCss.actionCheck}>
                            <i className="fa fa-check" />
                        </button>
                        <button onClick={abort} className={defaultCss.actionReject}>
                            <i className="fa fa-cancel" />
                        </button> */}

                        <Button
                            onClick={submit}
                            className={defaultCss.actionCheck}
                            title={<i className="fa fa-check" />}
                        />

                        <Button
                            onClick={abort}
                            className={defaultCss.actionReject}
                            title={<i className="fa fa-cancel" />}
                        />
                    </>
                )}
            </span>
        </span>
    )
}

export default Input;

const readOnlyParameter = { readOnly: true };
const parametersPlaceholder = {};