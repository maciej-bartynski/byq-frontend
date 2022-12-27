import stringsConcatWithSpace from 'lib/tools/stringsConcatWithSpace';
import { FC } from 'react';
import Button from '../Button';
import { ButtonProps } from '../types';
import defaultCss from './ButtonPrimary.module.css';

const ButtonPrimary: FC<ButtonProps> = (props) => {
    const resolvedCssClass = stringsConcatWithSpace(defaultCss.root, props.className)
    return (
        <Button
            {...props}
            className={resolvedCssClass}
        />
    )
}

export default ButtonPrimary