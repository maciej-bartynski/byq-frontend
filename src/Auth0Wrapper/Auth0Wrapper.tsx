import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import NotLogged from 'views/NotLogged';
import AuthLoading from 'views/AuthLoading';
import NoticesService from 'lib/services/notices/notices';
import { Auth0Context } from './AuthContext';
import config from 'config';
import useDevelopmentAuth from './useDevelopmentUser';

type AuthConfig = {
    domain: string,
    clientId: string,
    audience: string,
}

const AUTH_CONFIG_URL = `${config.apiServer}${config.authConfigPath}`;

const Auth0Wrapper: FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [authConfig, setAuthConfig] = useState<AuthConfig>();

    useEffect(() => {
        async function fetchAuthConfig() {
            await fetch(AUTH_CONFIG_URL)
                .then<AuthConfig>(response => response.json())
                .then(authConfig => {
                    setAuthConfig(authConfig);
                    setLoading(false);
                })
                .catch(error => {
                    NoticesService.newMessage(error);
                    setLoading(false);
                })
        }

        fetchAuthConfig()
    }, []);

    if (loading) {
        return (<AuthLoading />)
    }

    if (!authConfig) {
        return (<NotLogged />)
    }

    return (
        <Auth0Provider
            domain={authConfig.domain}
            clientId={authConfig.clientId}
            redirectUri={window.location.origin}
            audience={authConfig.audience}
        >
            <Auth0StageTwo>
                {children}
            </Auth0StageTwo>
        </Auth0Provider>
    )
}

const Auth0StageTwo: FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const productionAuth0 = useAuth0();
    const developmentAuth0 = useDevelopmentAuth();
    const auth0 = process.env.REACT_APP_SKIP_AUTH0 === 'true' 
        ? developmentAuth0 
        : productionAuth0;

    window.sessionStorage.setItem(config.sessionStorageUser, JSON.stringify(auth0.user || ""));
    const accessToken = window.sessionStorage.getItem(config.sessionStorageAccessToken);

    useEffect(() => {
        async function fetchAccessToken() {
            try {
                const accessToken = await auth0.getAccessTokenSilently();
                if (accessToken) {
                    window.sessionStorage.setItem(config.sessionStorageAccessToken, accessToken);
                } else {
                    NoticesService.newMessage('Failed to fetch access token.');
                }
            } catch (e) {
                NoticesService.newMessage(JSON.stringify(e));
            }
            setLoading(false);
        }
        fetchAccessToken();
    }, [auth0]);

    if (loading || auth0.isLoading) {
        return (<AuthLoading />);
    }

    if (!auth0.isAuthenticated || !auth0.user || !accessToken) {
        return (<NotLogged />);
    }

    return (
        <Auth0Context.Provider
            value={auth0}
        >
            {children}
        </Auth0Context.Provider>
    );
}

export default Auth0Wrapper
