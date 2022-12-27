import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { FC, PropsWithChildren } from "react";
import defaultCss from './Label.module.css';

type CustomPRops = {
    required?: boolean;
}
const Label: FC<
    PropsWithChildren &
    React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> &
    CustomPRops
> = ({
    children,
    required,
    ...rest
}) => {
        const classNames = stringsConcatWithSpace(defaultCss.root, required ? defaultCss.required : undefined);

        return (
            <label
                className={classNames}
                {...rest}
            >
                {children}
            </label>
        )
    }

export default Label;