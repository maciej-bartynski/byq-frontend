import { FC } from "react";
import defaultCss from './AuthLoading.module.css';

const AuthLoading: FC = () => {
    return (
        <div className={defaultCss.root}>
            <div className={defaultCss.card}>
                <h1 className={defaultCss.title}>
                    Hello to <strong className={defaultCss.titleAccent}>ByQ</strong>
                </h1>
                <p className={defaultCss.or}>
                    please wait
                </p>
                <p className={defaultCss.contactAdmin}>
                    Loading...
                </p>
            </div>
        </div>
    )
}

export default AuthLoading;