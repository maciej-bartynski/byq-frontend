import { FC, useEffect, useRef } from "react";
import { createElement, DetailedHTMLProps, PropsWithChildren, ReactHTML } from "react";
import LayoutData from "lib/layout/LayoutData";
import { LayoutElementNames } from "lib/layout/layoutElementNames";

type CustomProps = PropsWithChildren<{
    as?: keyof ReactHTML,
    layoutElementName: LayoutElementNames,
    layoutElementKey?: string,
}>

const LayoutElement: FC<CustomProps & DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
>> = ({
    as = 'span',
    layoutElementName,
    layoutElementKey,
    ...props
}) => {
        const elementReference = useRef<Element>(null);

        LayoutData.initialize();
        const layoutElementNameKey = LayoutData.getLayoutElementNameKey({ elementName: layoutElementName, key: layoutElementKey })
        LayoutData.getInstance().storeElementRef({ elementName: layoutElementName, element: elementReference, key: layoutElementKey });

        useEffect(() => {
            if (process.env.NODE_ENV === 'development') {
                try {
                    const storedElement = LayoutData.getInstance().getElementRef({ elementName: layoutElementName, key: layoutElementKey });
                    const comparedElement = document.querySelector(`[data-layoutelementselector="${layoutElementNameKey}"]`);
                    if (storedElement.current !== comparedElement) {
                        throw new Error(`LayoutElement error. Invalid configuration for ${layoutElementName}`)
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        })

        return createElement(as, {
            ...props,
            'data-layoutelementselector': layoutElementNameKey,
            ref: elementReference
        })
    };

export default LayoutElement;
