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

    const response = await fetch('/users', {
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

    return users.data || []
}

export default getUsers;
