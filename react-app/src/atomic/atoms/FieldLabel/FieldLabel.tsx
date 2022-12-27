import stringsConcatWithSpace from "lib/tools/stringsConcatWithSpace";
import { FC } from "react";
import defaultCss from './FieldLabel.module.css';

const FieldLabel: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>> = ({
    className,
    ...rest
}) => (
    <span className={stringsConcatWithSpace(defaultCss.root, className)} {...rest}/>
)

export default FieldLabel