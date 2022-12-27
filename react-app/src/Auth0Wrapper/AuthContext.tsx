import { useAuth0, User } from "@auth0/auth0-react";
import { createContext, useContext } from "react";

type InitialState = {
    isAuthenticated?: boolean;
    isLoading: boolean;
    user?: User
}

const auth0InitialState:InitialState = {} as InitialState
const Auth0Context = createContext(auth0InitialState);
const useAuth0Context: typeof useAuth0 = () => useContext(Auth0Context) as any;
export default useAuth0Context;
export {
    Auth0Context,
    auth0InitialState
}