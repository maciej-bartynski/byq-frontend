import config from "config";
import { useEffect, useState } from "react";

const useDevelopmentAuth = () => {
    const [auth, setAuth] = useState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
    });

    useEffect(() => {
        if (process.env.REACT_APP_SKIP_AUTH0 === 'true') {
            setAuth({
                user: null,
                isAuthenticated: false,
                isLoading: true,
            })

            fetch(`${config.apiServer}${config.developmentUserPath}`)
                .then(response => response.json())
                .then(authUser => {
                    setAuth({
                        user: authUser.data,
                        isAuthenticated: true,
                        isLoading: false,
                    })
                })
                .catch(() => {
                    setAuth({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    })
                })
        }
    }, [
        setAuth
    ])

    return {
        ...auth,
        getAccessTokenSilently: async () => new Promise<string>((res) => res('mocked-access-token'))
    }
}

export default useDevelopmentAuth;