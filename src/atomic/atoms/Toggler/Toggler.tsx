import { cloneElement, FC, useCallback, useEffect, useRef, useState } from 'react';

type Render<T> = (renderParams: {
    toggleOpened: () => void;
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => T;

const Toggler: FC<{
    renderButton: Render<JSX.Element>,
    renderContent: Render<JSX.Element>,
    initialOpened?: boolean,
}> = ({
    renderButton,
    renderContent,
    initialOpened = false
}) => {
        const [opened, setOpened] = useState(initialOpened);
        const buttonRef = useRef<HTMLElement>(null);
        const contentRef = useRef<HTMLElement>(null);

        const toggleOpened = useCallback(() => {
            setOpened(state => !state);
        }, []);

        const renderParams = {
            opened,
            setOpened,
            toggleOpened,
        }

        const renderedButton = renderButton(renderParams);
        const renderedContent = renderContent(renderParams);

        const buttonWithRef = cloneElement(renderedButton, { ref: buttonRef });
        const contentWithRef = cloneElement(renderedContent, { ref: contentRef });

        useEffect(() => {
            function detectOutsideClick(e: MouseEvent) {
                const target = e.target as HTMLElement;
                const openedContent = contentRef.current as HTMLElement;
                const button = buttonRef.current as HTMLElement;
                if (target && openedContent && button) {
                    const clickInsideContent = openedContent.contains(target)
                        || openedContent === target
                        || button.contains(target)
                        || button === target;

                    if (!clickInsideContent) {
                        setOpened(false)
                    }
                }
            }
            window.addEventListener('click', detectOutsideClick);
            return () => window.removeEventListener('click', detectOutsideClick);
        })

        return (
            <>
                {buttonWithRef}
                {opened
                    ? contentWithRef
                    : null
                }
            </>
        )
    }

export default Toggler;