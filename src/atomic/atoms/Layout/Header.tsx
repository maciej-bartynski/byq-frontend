import LayoutElement from "components/LayoutElement";
import { LayoutElementNames } from "lib/layout/layoutElementNames";
import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { DetailedHTMLProps, FC, PropsWithChildren, ReactHTML } from "react";
import defaultCss from './Layout.module.css';

type CustomProps = PropsWithChildren<{
    as?: keyof ReactHTML,
    layoutElementName: LayoutElementNames
}>

const Header: FC<CustomProps & DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
>> = ({
    as = 'header',
    layoutElementName,
    ...props
}) => {
        return (
            <LayoutElement
                {...props}
                layoutElementName={layoutElementName}
                as={as}
                className={stringsConcatWithSpace(defaultCss.header, props.className)}
            />
        )
    }

export default Header;