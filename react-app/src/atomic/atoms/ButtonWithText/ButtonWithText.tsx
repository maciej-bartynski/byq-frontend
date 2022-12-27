import { FC, ReactNode } from "react";
import Button from "atomic/atoms/Button";
import { ButtonProps } from "../Button/Button";

const ButtonWithText: FC<{
    text: ReactNode;
    variant?: 'reverse'
} & ButtonProps> = ({
    text,
    variant,
    ...rest
}) => {
        if (variant === 'reverse') {
            return (
                <>
                    <span>{text}</span>
                    <Button {...rest} />
                </>
            )
        }
        return (
            <>
                <Button {...rest} />
                <span>{text}</span>
            </>
        )
    }
export default ButtonWithText;