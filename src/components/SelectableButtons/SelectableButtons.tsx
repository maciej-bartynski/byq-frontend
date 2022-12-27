import ButtonSecondary from "atomic/atoms/Buttons/ButtonSecondary";
import { default as RawButton } from 'atomic/atoms/Buttons/Button';
import { PropsWithChildren, ReactNode, useCallback, useEffect, useState } from "react";
import defaultCss from './SelectableButtons.module.css';

type SelectableOption<T = any> = {
    label: ReactNode,
    value: T
}

function ButtonsList<T = any>({
    options,
    onSelect,
}: {
    options: SelectableOption<T>[],
    onSelect: (selected: T[]) => void,
}): JSX.Element {
    const [selected, setSelected] = useState<T[]>([]);

    const toggleSelected = useCallback((value: T) => {
        setSelected(state => {
            const selected = state.some(val => val === value);
            if (selected) return state.filter(val => val !== value);
            return [...state, value];
        })
    }, [setSelected])

    useEffect(() => {
        onSelect(selected);
    }, [selected, onSelect])

    return (
        <div className={defaultCss.root}>
            {options.map(option => {
                return (
                    <Button 
                        onClick={toggleSelected} 
                        value={option.value}
                        selected={selected.some(val => val === option.value)}
                        key={JSON.stringify(option.value)}
                    >
                        {option.label}
                    </Button>
                )
            })}
        </div>
    )
}

function Button<T = any>({
    children,
    onClick,
    value,
    selected
}: PropsWithChildren<{
    onClick: (value: T) => void,
    value: T,
    selected: boolean
}>) {

    const onClickCallback = useCallback(() => {
        onClick(value)
    }, [onClick, value])

    if (!selected) {
        return (
            <RawButton onClick={onClickCallback}>
                {children}
            </RawButton>
        )
    }

    return (
        <ButtonSecondary onClick={onClickCallback}>
            {children}
        </ButtonSecondary>
    )
}

const SelectableButtons = {
    ButtonsList,
    Button
};

export default SelectableButtons