import config from "config";
import NoticesService from 'lib/services/notices';
import OtherUser from "types/OtherUser";

const controllerStore = {
    controller: new AbortController()
};

async function getUsers(): Promise<OtherUser[]> {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();

    let accessToken: string;
    try {
        accessToken = sessionStorage.getItem(config.sessionStorageAccessToken) || '';
    } catch (e: any) {
        throw new Error(e);
    }

    const USERS_URL = process.env.REACT_APP_SKIP_AUTH0 === 'true'
        ? '/mock-other-users/mock_other_users.json'
        : '/users'
    const response = await fetch(USERS_URL, {
        method: 'GET', 
        signal: controllerStore.controller.signal,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })

    const users = await response.json() as {
        message: string,
        data: OtherUser[],
        error: any,
    };

    if (response.status !== 200) {
        NoticesService.newMessage(users.message);
    }

    return process.env.REACT_APP_SKIP_AUTH0 === 'true'
        ? users as any as OtherUser[]
        : users.data || []
}

export default getUsers;
