import { FC, useCallback, useState } from "react";
import defaultCss from './InputSearch.module.css';

const InputSearch: FC<{
    onSearch?: (term: string) => void,
    disabled?: boolean,
    className?: string
}> = ({
    onSearch,
    disabled,
    className
}) => {

    const [searchInputFocused, setSearchInputFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const onFocus = useCallback(() => {
        setSearchInputFocused(true)
    }, []);

    const onBlur = useCallback(() => {
        setSearchInputFocused(false)
    }, []);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (onSearch) onSearch(term);
    }, [onSearch]);

    const onClear: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        if (!disabled) {
            setSearchTerm("");
            if (onSearch) onSearch("");
        }
    }, [onSearch, disabled])

    const resolvedInputClassName = searchInputFocused || searchTerm
        ? defaultCss.searchLabel_focused
        : defaultCss.searchLabel;

    return (
        <label className={`${resolvedInputClassName} ${className || ""}`}>
            <input
                className={defaultCss.search}
                type="text"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
                placeholder="Search"
                value={searchTerm}
                disabled={disabled}
            />
            <span
                className={defaultCss.searchLabel__iconSearch}
                onClick={(searchInputFocused || searchTerm) ? onClear : undefined}
                tabIndex={-1}
            >
                {searchInputFocused || searchTerm
                    ? <i className={`fa fa-remove`} />
                    : <i className={`fa fa-search`} />}
            </span>
        </label>
    )
}

export default InputSearch;