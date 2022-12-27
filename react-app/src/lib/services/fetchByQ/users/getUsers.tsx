import fetchByQ from "lib/services/fetchByQ";
import NoticesService from 'lib/services/notices';
import OtherUser from "types/OtherUser";

const controllerStore = {
    controller: new AbortController()
};

async function getUsers(): Promise<OtherUser[]> {
    controllerStore.controller.abort();
    controllerStore.controller = new AbortController();
    const response = await fetchByQ('users', { method: 'GET', signal: controllerStore.controller.signal });
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
