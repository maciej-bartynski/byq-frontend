import LoginButton from "features/Login/Login";
import { FC } from "react";
import defaultCss from './NotLogged.module.css';

const NotLogged: FC<{ isLoading?: boolean }> = ({ isLoading = false }) => {
    return (
        <div className={defaultCss.root}>
            <div className={defaultCss.card}>
                <h1 className={defaultCss.title}>
                    Hello to <strong className={defaultCss.titleAccent}>ByQ</strong>
                </h1>
                <LoginButton
                    disabled={isLoading}
                    className={defaultCss.loginButton}
                    label={isLoading ? 'Logging...' : 'Log in >'}
                />
                {!isLoading && (
                    <>
                        <p className={defaultCss.or}>
                            or
                        </p>
                        <p className={defaultCss.contactAdmin}>
                            contact admin<br />to create account
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default NotLogged;