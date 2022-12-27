import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import defaultCss from './Login.module.css';

const LoginButton: FC<{
  className?: string,
  disabled?: boolean,
  label?: string,
}> = ({
  className,
  disabled = false,
  label = "Log in >"
}) => {
    const { loginWithRedirect } = useAuth0();

    return (
      <button
        className={className || defaultCss.root}
        onClick={loginWithRedirect}
        disabled={disabled}
      >
        {label}
      </button>
    );
  };

export default LoginButton;