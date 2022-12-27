import { User } from "@auth0/auth0-react";
import config from "config";

async function fetchByQ(route?: string, options?: Record<string, any>): Promise<Response>
async function fetchByQ(route = "", options = {}) {
    let user: User;
    let accessToken: string;
    try {
        user = JSON.parse(sessionStorage.getItem(config.sessionStorageUser) || '');
        accessToken = sessionStorage.getItem(config.sessionStorageAccessToken) || '';
    } catch (e: any) {
        throw new Error(e);
    }
    
    const userId = process.env.REACT_APP_SKIP_AUTH0 === 'true' 
        ? 'oauth:john.doe.id'
        : user.sub;

    const API_URL = `${config.baseUrl}${config.apiPath}`
    return fetch(`${API_URL}/${userId}/${route}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...((options as { headers: any })?.headers instanceof Object
                ? (options as { headers: any })
                : {}),
        }
    })
}

export default fetchByQ